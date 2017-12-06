import (
        "log"
        "gopkg.in/zabawaba99/firego.v1"
        "golang.org/x/net/context"

        firebase "firebase.google.com/go"
        "firebase.google.com/go/auth"

        "google.golang.org/api/option"
)

f := firego.New("https://ping-fdb36.firebaseIO.com", nil)

opt := option.WithCredentialsFile("ping-fdb36-firebase-adminsdk-plh3v-282c5f84fb.json")
app, err := firebase.NewApp(context.Background(), nil, opt)
if err != nil {
        log.Fatalf("error initializing app: %v\n", err)
}



type PayloadCollection struct {
	WindowsVersion  string    `json:"version"`
	Token           string    `json:"token"`
	Payloads        []Payload `json:"data"`
}

type Payload struct {
    title string
    body string
    // feedId int32
    // creatorID int32
}

func (p *Payload) UploadToFB() error {
  // the storageFolder method ensures that there are no name collision in
  // case we get same timestamp in the key name
  storage_path := fmt.Sprintf("%v/%v", p.storageFolder, time.Now().UnixNano())

	b := new(bytes.Buffer)
	encodeErr := json.NewEncoder(b).Encode(payload)
	if encodeErr != nil {
		return encodeErr
	}

  // pushedFirego, err := f.Push(encodeErr)
  // if err != nil {
  // 	log.Fatal(err)
  // }
  //
  // var bar string
  // if err := pushedFirego.Value(&bar); err != nil {
  // 	log.Fatal(err)
  // }
  //
  // // prints "https://my-firebase-app.firebaseIO.com/-JgvLHXszP4xS0AUN-nI: bar"
  // fmt.Printf("%s: %s\n", pushedFirego, bar)

	return f.Push(encodeErr)
}





func payloadHandler(w http.ResponseWriter, r *http.Request) {

  if r.Method != "POST" {
		w.WriteHeader(http.StatusMethodNotAllowed)
		return
	}

  // Read the body into a string for json decoding
	var content = &PayloadCollection{}
	err := json.NewDecoder(io.LimitReader(r.Body, MaxLength)).Decode(&content)
    if err != nil {
		w.Header().Set("Content-Type", "application/json; charset=UTF-8")
		w.WriteHeader(http.StatusBadRequest)
		return
	}

    // Go through each payload and queue items individually to be posted to S3
    for _, payload := range content.Payloads {
      p := payload
      go p.UploadToFB()
    }
    w.WriteHeader(http.StatusOK)
}
