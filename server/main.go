package main

import (
	_ "expvar"
	"flag"
	"fmt"
	"net/http"
	_ "net/http/pprof"
	"io"
	"log"
	"strings"
	"gopkg.in/zabawaba99/firego.v1"
	"golang.org/x/oauth2"
	"bytes"
	"encoding/json"
	"io/ioutil"
	"golang.org/x/oauth2/google"
	"time"
)
type Payload struct {
	Feed string
	Key string
}

// Job holds the attributes needed to perform unit of work.
type Job struct {
	Payload Payload
}
type AuthKey struct {
	authorization_key string
}

func (p *Payload) UploadToFB() error {
	fmt.Printf("Attempting to upload to firebase")

	d, err := ioutil.ReadFile("ping-fdb36-firebase-adminsdk-plh3v-282c5f84fb.json")
	if err != nil {
		return err
	}

	conf, err := google.JWTConfigFromJSON(d, "https://www.googleapis.com/auth/userinfo.email",
		"https://www.googleapis.com/auth/firebase.database")
	if err != nil {
		return err
	}
	fb := firego.New("https://ping-fdb36.firebaseio.com", conf.Client(oauth2.NoContext))


	b := new(bytes.Buffer)

	encodeErr := json.NewEncoder(b).Encode(p)
	if encodeErr != nil {
		return encodeErr
	}


	var result map[string]interface{}

	fb.Child("/feeds/"+p.Feed).Value(&result)

	// fmt.Printf("\n\nLength %d",len(result))
	// fmt.Printf("%#v", result)
	// fmt.Printf("\n\n\n%#v", result["authorization_key"])

	if(result != nil && result["authorization_key"] == p.Key ){

		fmt.Printf("\nGet ref to Firebase\n")
		fb, err = fb.Ref("/feeds/"+ p.Feed+"/activity")
		if err != nil {
			return err;
		}

		fmt.Printf("\nGet timestamp\n")
		t := time.Now().Unix()
		// t.Format("20060102150405")
		fmt.Printf("%s",t)
		fmt.Printf("\nPush to Firebase\n")
		pushedFirego, err := fb.Push(t)
		if err != nil {
			fmt.Printf("\nError pushing\n")
			return err;
		}

		var bar string
		if err := pushedFirego.Value(&bar); err != nil {
			return err
		}
	}

	return err
}


// NewWorker creates takes a numeric id and a channel w/ worker pool.
func NewWorker(id int, workerPool chan chan Job) Worker {
	return Worker{
		id:         id,
		jobQueue:   make(chan Job),
		workerPool: workerPool,
		quitChan:   make(chan bool),
	}
}

type Worker struct {
	id         int
	jobQueue   chan Job
	workerPool chan chan Job
	quitChan   chan bool
}

func (w Worker) start() {
	go func() {
		for {
			// Add my jobQueue to the worker pool.
			w.workerPool <- w.jobQueue

			select {
			case job := <-w.jobQueue:
				fmt.Printf("\nAttempting to post to database job %s",job.Payload)
				job.Payload.UploadToFB()
				fmt.Printf("\nCompleted attemp to post to database%s",job.Payload)
			case <-w.quitChan:
				// We have been asked to stop.
				fmt.Printf("\nWorker%d stopping\n", w.id)
				return
			}
		}
		}()
	}

	func (w Worker) stop() {
		go func() {
			w.quitChan <- true
			}()
		}

		// NewDispatcher creates, and returns a new Dispatcher object.
		func NewDispatcher(jobQueue chan Job, maxWorkers int) *Dispatcher {
			workerPool := make(chan chan Job, maxWorkers)

			return &Dispatcher{
				jobQueue:   jobQueue,
				maxWorkers: maxWorkers,
				workerPool: workerPool,
			}
		}

		type Dispatcher struct {
			workerPool chan chan Job
			maxWorkers int
			jobQueue   chan Job
		}

		func (d *Dispatcher) run() {
			for i := 0; i < d.maxWorkers; i++ {
				worker := NewWorker(i+1, d.workerPool)
				worker.start()
			}

			go d.dispatch()
		}

		func (d *Dispatcher) dispatch() {
			for {
				select {
				case job := <-d.jobQueue:
					go func() {
						fmt.Printf("fetching workerJobQueue for: \n")
						workerJobQueue := <-d.workerPool
						fmt.Printf("adding to workerJobQueue\n")
						workerJobQueue <- job
						}()
					}
				}
			}

			func requestHandler(w http.ResponseWriter, r *http.Request, jobQueue chan Job) {
				// Make sure we can only be called with an HTTP POST request.

				// io.WriteString(w, "Hello world!")
				// io.WriteString(w, r.URL.Path)
				// if r.Method != "POST" {
				// 	w.Header().Set("Allow", "POST")
				// 	w.WriteHeader(http.StatusMethodNotAllowed)
				// 	return
				// }
				// Parse feed

				// feed := strings.TrimPrefix(r.URL.Path, "/")
				url := strings.TrimPrefix(r.URL.Path, "/")
				urlSplit := strings.Split(url, "/")
				fmt.Printf("%v",urlSplit)
				fmt.Printf("Feed: %s",urlSplit[0])
				fmt.Printf("auth: %s",urlSplit[1])
				feed,authKey := urlSplit[0],urlSplit[1]


				io.WriteString(w, feed +" "+authKey)

				// Create Job and push the work onto the jobQueue.
				p := Payload{Feed: feed, Key:authKey}
				job := Job{Payload: p}
				jobQueue <- job

				// Render success.
				w.WriteHeader(http.StatusCreated)
			}

			func main() {
				var (
					maxWorkers   = flag.Int("max_workers", 5, "The number of workers to start")
					maxQueueSize = flag.Int("max_queue_size", 100, "The size of job queue")
					port         = flag.String("port", "8080", "The server port")
				)

				flag.Parse()
				// Create the job queue.
				jobQueue := make(chan Job, *maxQueueSize)

				// Start the dispatcher.
				dispatcher := NewDispatcher(jobQueue, *maxWorkers)
				dispatcher.run()

				// Start the HTTP handler.
				http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
					requestHandler(w, r, jobQueue)
				})
				log.Fatal(http.ListenAndServe(":"+*port, nil))
			}
