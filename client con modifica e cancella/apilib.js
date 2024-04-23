var baseURL="http://localhost/wsphp/";
var nomorto="non e' ancora morto";
function leggi(){
    var param1=document.getElementById('pk').value;
    
    if(param1!=""){
        
    fetch(baseURL+param1)
    .then(response => {response.json()
        response.status==404;
      })
    .then(json => {
       //Ricavo Json dalla risposta
       jjson= JSON.stringify(json);
       //conversione in oggetto javascript
       obj=JSON.parse(jjson);
       
       //estrazione informazione
       
       contenuto.innerHTML =obj.nome+" "+obj.cognome;
        }
       )
    }
    else{
        alert("inserisci un id");
    }
}
function leggiTutto(){
     fetch(baseURL)
     .then(response => response.json())
     .then(json => {
        //Ricavo Json dalla risposta
        jjson= JSON.stringify(json);
        //conversione in oggetto javascript
        obj=JSON.parse(jjson);
        //estrazione informazione dall'array di oggetti
         html="<table border = '1' width = 100 >";
         html+="<tr><td>id</td><td>Nome</td><td>Cognome</td><td>Data di nascita</td><td>Data di morte</td></tr>"
         for(var i=0;i<obj.length;i++){
            if(obj[i].data_di_morte!=null)
               html+="<tr><td>"+obj[i].id+"</td><td>"+obj[i].nome+"</td><td>"+obj[i].cognome+"</td><td>"+obj[i].data_di_nascita+"</td><td>"+obj[i].data_di_morte+"</td></tr>";
            else
                html+="<tr><td>"+obj[i].id+"</td><td>"+obj[i].nome+"</td><td>"+obj[i].cognome+"</td><td>"+obj[i].data_di_nascita+"</td><td>"+nomorto+"</td></tr>";
         }
         html+="</table>";
         contenuto.innerHTML=html;
          }
        )
 }
function aggiungi(){
    var nnome = document.getElementById('nome').value;
    var ccognome = document.getElementById('cognome').value;
    var ddata_di_nascita = document.getElementById('data_di_nascita').value;
    var ddata_di_morte = document.getElementById('data_di_morte').value;
    if(nnome==""||ccognome==""||ddata_di_nascita=="")
        alert("inserisci nome, cognome e data di nascita");
    else{
        if(nnome!=null&&ccognome!=null&&ddata_di_nascita!=null&&ddata_di_morte==null){
            ddata_di_morte=null;
        }
      fetch(baseURL+"/posts", {
          method: "POST",
          headers: {
              "Accept": "application/json",
              "Content-Type": "application/json"
          },
          body: JSON.stringify({
              nome: nnome,
              cognome: ccognome,
              data_di_nascita: ddata_di_nascita,
              data_di_morte: ddata_di_morte,
          })
      })
      .then(response => {response.json()
          contenuto.innerHTML =response.status;
        });
    }
    }
function elimina(){
        var param1=document.getElementById('pk').value;
        
        if(param1!=" "){
            fetch(baseURL + param1, {
                method: "DELETE",
            })
            .then(response => {
                if(response.status === 200) {
                    alert("Record eliminato con successo.");
                } else if(response.status === 404) {
                    alert("Record non trovato.");
                } else {
                    alert("Errore durante l'eliminazione del record.");
                }
            });
        }
        else{
            alert("Inserisci un ID per eliminare il record.");
        }
    }
    function aggiorna() {
        var id = document.getElementById('id').value;
        var nnome = document.getElementById('nome').value;
        var ccognome = document.getElementById('cognome').value;
        var ddata_di_nascita = document.getElementById('data_di_nascita').value;
        var ddata_di_morte = document.getElementById('data_di_morte').value;
    
        if (id == "" || nnome == "" || ccognome == "" || ddata_di_nascita == "") {
            alert("Inserisci id, nome, cognome e data di nascita.");
        } else {
            if (ddata_di_morte === "") {
                ddata_di_morte = null;
            }
    
            fetch(baseURL + "/" + id, {
                    method: "PUT",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        nome: nnome,
                        cognome: ccognome,
                        data_di_nascita: ddata_di_nascita,
                        data_di_morte: ddata_di_morte
                    })
                })
                .then(response => {
                    if (response.ok) {
                        alert("Record aggiornato con successo.");
                    } else {
                        alert("Si è verificato un errore durante l'aggiornamento del record. Codice errore: " + response.status);
                    }
                })
                .catch(error => {
                    console.error("Si è verificato un errore durante la richiesta PUT:", error);
                    alert("Si è verificato un errore durante la richiesta PUT. Controlla la console per ulteriori dettagli.");
                });
        }
    }