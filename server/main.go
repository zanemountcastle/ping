package main

import (
	_ "expvar"
	"flag"
	"fmt"
	"net/http"
	_ "net/http/pprof"
	// "time"
  "io"
  "log"
  "strings"
  "gopkg.in/zabawaba99/firego.v1"
  // "golang.org/x/net/context"
  // "firebase.google.com/go"
// "ioutil"
  "golang.org/x/oauth2"
  "bytes"
  "encoding/json"
  "io/ioutil"
  // "google.golang.org/api/option"
  // "google"
  "golang.org/x/oauth2/google"
)
type Payload struct {
    Feed string
    // Token string
    // title string
    // body string
    // feedId int32
    // creatorID int32
}

// Job holds the attributes needed to perform unit of work.
type Job struct {
	Payload Payload
}
type AuthKey struct {
	authorization_key string
}

func (p *Payload) UploadToFB() error {

  // f := firego.New("https://ping-fdb36.firebaseIO.com", nil)

  fmt.Printf("Create Firebase\n")
fmt.Printf("Read File\n")
  d, err := ioutil.ReadFile("ping-fdb36-firebase-adminsdk-plh3v-282c5f84fb.json")
  if err != nil {

      fmt.Printf("Error\n")
      return err
  }
fmt.Printf("Config JSON\n")
  conf, err := google.JWTConfigFromJSON(d, "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/firebase.database")
  if err != nil {
      fmt.Printf("Error\n")
      return err
  }
  fmt.Printf("firego\n")
  fb := firego.New("https://ping-fdb36.firebaseio.com", conf.Client(oauth2.NoContext))
  // use the authenticated fb instance

  // opt := option.WithCredentialsFile("ping-fdb36-firebase-adminsdk-plh3v-282c5f84fb.json")
  // app, err := firebase.NewApp(context.Background(), nil, opt)
  // if err != nil {
  //         log.Fatalf("error initializing app: %v\n", err)
  // }

  // the storageFolder method ensures that there are no name collision in
  // case we get same timestamp in the key name
  //  storage_path := fmt.Sprintf("%v/%v", p.storageFolder, time.Now().UnixNano())

  fmt.Printf("bytes\n")
	b := new(bytes.Buffer)
  fmt.Printf("json\n")
	encodeErr := json.NewEncoder(b).Encode(p)


	if encodeErr != nil {
    fmt.Printf("Error\n")
		return encodeErr
	}


  fmt.Printf("push\n")
  // if(p.token == fb.Get("/feed/"+p.Feed)){
	 // authKey, err :=fb.Ref("/feed/"+ p.Feed+"/authorization_key")

  	var result map[string]interface{}

	 fb.Child("/feeds/"+p.Feed).Value(&result)

	 // if(result )
//.LimitToFirst(1).OrderBy("feeds")
	 // {//.Child(p.Feed).EqualTo(p.Feed).Value(&result); err != nil {
		// 	    log.Fatal(err)
		// 	}

		fmt.Printf("\n\nLength %d",len(result))
		fmt.Printf("%#v", result)
		fmt.Printf("\n\n\n%#v", result["authorization_key"])
	 // fmt.Printf( "\nAUTH KEY %s",authKey.Value())
	 fb, err = fb.Ref("/feed/"+ p.Feed)
	 pushedFirego, err := fb.Push( p.Feed)
  // }

  // fmt.Printf(pushedFirego)

  // fmt.Printf(err.Error())
  if err != nil {

      // fmt.Printf("Error: " + err.Error())
  	return err;
  }

  var bar string
  if err := pushedFirego.Value(&bar); err != nil {
    // fmt.Printf("Error: " + err.Error())
  	return err
  }

  // // prints "https://my-firebase-app.firebaseIO.com/-JgvLHXszP4xS0AUN-nI: bar"
  // fmt.Printf("%s: %s\n", pushedFirego, bar)

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
          fmt.Printf("Starting job %s",job.Payload)
				// Dispatcher has added a job to my jobQueue.
				// fmt.Printf("worker%d: started %s, blocking for %f
// seconds\n", w.id, job.Delay.Seconds())
				// time.Sleep(job.Delay)

				// fmt.Printf("worker%d: completed %s!\n", w.id, job.
// Name)  fmt.Print
          job.Payload.UploadToFB()
          fmt.Printf("Finished uploading%s",job.Payload)
			case <-w.quitChan:
				// We have been asked to stop.
				fmt.Printf("worker%d stopping\n", w.id)
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


  io.WriteString(w, authKey)
	// io.WriteString(w, authKey)
	// // Parse the delay.
	// delay, err := time.ParseDuration(r.FormValue("delay"))
	// if err != nil {
	// 	http.Error(w, "Bad delay value: "+err.Error(), http.StatusBadRequest)
	// 	return
	// }
  //
	// // Validate delay is in range 1 to 10 seconds.
	// if delay.Seconds() < 1 || delay.Seconds() > 10 {
	// 	http.Error(w, "The delay must be between 1 and 10 seconds, inclusively.", http.StatusBadRequest)
	// 	return
	// }
  //
	// // Set name and validate value.
	// name := r.FormValue("name")
	// if name == "" {
	// 	http.Error(w, "You must specify a name.", http.StatusBadRequest)
	// 	return
	// }

	// Create Job and push the work onto the jobQueue.
  p := Payload{Feed: feed}
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
