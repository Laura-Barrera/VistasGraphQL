function loadAuthors() {
    var table = document.getElementById('tableBodySinger')
    const query = `
                                  query Query {
                                                authors {
                                                  _id
                                                  birthday
                                                  id
                                                  name
                                                }
                                              }
                                  `
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
    };
    fetch("http://localhost:4000/", options).then(resp => resp.json())
        .then(resp => {
            resp.data.authors.forEach(n => {
                var row = document.createElement('tr')
                var tdObjId = document.createElement('td')
                tdObjId.append(document.createTextNode(n._id))
                row.append(tdObjId)
                var tdid = document.createElement('td')
                tdid.append(document.createTextNode(n.id))
                row.append(tdid)
                var tdname = document.createElement('td')
                tdname.append(document.createTextNode(n.name))
                row.append(tdname)
                var tdbirthday = document.createElement('td')
                tdbirthday.append(document.createTextNode(n.birthday))
                row.append(tdbirthday)
                table.append(row)

                var tdUpdate = document.createElement('td')
                tdUpdate.innerHTML = '<div class="text-center"><button type="button" class="btn btn-primary" onclick="editarDatosAuthor(\'' + n._id + '\')"> ✏️ </button></div>'
                row.append(tdUpdate)

                var tdDelete = document.createElement('td')
                tdDelete.innerHTML = '<div class="text-center"><button type="button" class="btn btn-danger" onclick="eliminarAuthor(\'' + n._id + '\')"> 📛 </button></div>'
                row.append(tdDelete)
                table.append(row)

            });
            $('#tableSingers').DataTable();
        })
}
function createAuthor() {
    var date = document.getElementById('dateSinger').value
    console.log(date)
    var name = document.getElementById('nameSinger').value
    var id = document.getElementById('idSinger').value
    const variables = {
        "saveAuthorId": id,
        "name": name,
        "birthday": date
    }
    const query = `query SaveAuthor($saveAuthorId: String!, $name: String!, $birthday: GraphQLDateTime!) {
        saveAuthor(id: $saveAuthorId, name: $name, birthday: $birthday) {
          birthday
          id
          name
        }
      }`
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query, variables }),
    };
    if (date != "" && name != "" && id != "") {
        fetch("http://localhost:4000/", options).then(resp => resp.json())
            .then(resp => {
                    if (resp.data.saveAuthor === null) {
                      alert('No se pudo crear el autor, ya existe el id.');
                      window.location.href = window.location.href;
                    } else {
                      alert('Autor creado exitosamente!');
                      window.location.href = window.location.href;
                    }
                
            })
    } else {
        alert('Campos vacíos!')
    }
}
var idAuthor =""
function editarDatosAuthor(id) {
    $(modalUpdateSinger).modal("show");
    idAuthor = id
}

function sendUpdateAuthor(){
    var id = document.getElementById('idSinger2').value
    var name = document.getElementById('nameSinger2').value
    var birthday = document.getElementById('dateSinger2').value

    id===""?id=null:0
    name==""?name=null:0
    birthday==""?birthday=null:0

    const query = `
    mutation UpdateAuthor($idAuthor: String!, $updateAuthorId: String, $name: String, $birthday: GraphQLDateTime) {
        updateAuthor(idAuthor: $idAuthor, id: $updateAuthorId, name: $name, birthday: $birthday) {
          _id
          name
        }
      }
    `
    const variables = {
        "idAuthor": idAuthor,
        "updateAuthorId": id,
        "name": name,
        "birthday": birthday
      }
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query,variables }),
    };
    fetch("http://localhost:4000/", options).then(resp => resp.json())
    .then(resp => {
        console.log(resp)
        alert('Datos ingresados actualizados exitosamente!')
        window.location.reload();

    })
}

function eliminarAuthor(id) {
    const variables = {
        "idAuthor": id
    }
    const query = `query DeleteAuthor($idAuthor: String!) {
            deleteAuthor(idAuthor: $idAuthor) {
              _id
              birthday
              id
              name
            }
          }`
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query, variables }),
    };
    var opcion = confirm("¿Está seguro de eliminar el autor?")
    if (opcion) {
        fetch("http://localhost:4000/", options).then(resp => resp.json())
            .then(resp => {
                alert('Autor eliminado exitosamente!')
                window.location.reload();

            })
    }



}

function loadSongs() {
    var table2 = document.getElementById('tableBodySong')
    const query = `
                    query Songs {
  songs {
    _id
    author {
      name
    }
    duration
    number
    title
  }
}
                                  `
    const options2 = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
    };
    fetch("http://localhost:4000/", options2).then(resp => resp.json())
        .then(resp => {
            console.log(resp)
            resp.data.songs.forEach(n => {
                var row = document.createElement('tr')

                var tdnumber = document.createElement('td')
                tdnumber.append(document.createTextNode(n.number))
                row.append(tdnumber)
                var tdtitle = document.createElement('td')
                tdtitle.append(document.createTextNode(n.title))
                row.append(tdtitle)
                var tdduration = document.createElement('td')
                tdduration.append(document.createTextNode(n.duration))
                row.append(tdduration)

                var tdname = document.createElement('td')
                tdname.append(document.createTextNode(n.author.name))
                row.append(tdname)

                var tdUpdate = document.createElement('td')
                tdUpdate.innerHTML = '<div class="text-center"><button type="button" class="btn btn-primary" onclick="editarDatosCancion(\'' + n._id + '\')" > ✏️ </button></div>'
                row.append(tdUpdate)

                var tdDelete = document.createElement('td')
                tdDelete.innerHTML = '<div class="text-center"><button type="button" class="btn btn-danger" onclick="eliminarCancion(\'' + n._id + '\')" > 📛 </button></div>'
                row.append(tdDelete)
                table2.append(row)

            });
            $('#tableSongs').DataTable();
        })
}
var idCancion=""
function editarDatosCancion(id) {
    $(modalUpdateSong).modal("show");
    idCancion = id
}

function sendEditSong(){
    var numberSong = document.getElementById('numberSong2').value
    var titleSong = document.getElementById('titleSong2').value
    var durationSong = document.getElementById('durationSong2').value
    var idObjectSinger = document.getElementById('idObjectSinger2').value
    numberSong===""?numberSong=null:numberSong=parseInt(numberSong)
    titleSong==""?titleSong=null:0
    durationSong==""?durationSong=null:durationSong=parseFloat(durationSong)
    idObjectSinger==""?idObjectSinger=null:0
    const query = `
    mutation Mutation($idSong: String!, $number: Int, $title: String, $duration: Float, $idAuthor: String) {
        updateSong(idSong: $idSong, number: $number, title: $title, duration: $duration, idAuthor: $idAuthor) {
          _id
          title
        }
      }
    `
    const variables = {
        "idSong": idCancion,
        "number": parseInt(numberSong),
        "title": titleSong,
        "duration": parseFloat(durationSong),
        "idAuthor": idObjectSinger
    }
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query,variables }),
    };
    fetch("http://localhost:4000/", options).then(resp => resp.json())
    .then(resp => {
        console.log(resp)
        alert('Datos ingresados actualizados exitosamente!')
        window.location.reload();

    })
}

function eliminarCancion(id) {
    const variables = {
        "idSong": id
    }
    const query = `query DeleteSong($idSong: String!) {
            deleteSong(idSong: $idSong) {
              _id
              duration
              number
              title
            }
          }`
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query, variables }),
    };
    var opcion = confirm("¿Está seguro de eliminar la canción?")
    if (opcion) {
        fetch("http://localhost:4000/", options).then(resp => resp.json())
            .then(resp => {
                alert('Canción eliminada exitosamente!')
                window.location.reload();

            })
    }


}

function createSong() {
    var numero = document.getElementById('numberSong').value
    var title = document.getElementById('titleSong').value
    var duration = document.getElementById('durationSong').value
    var idSinger = document.getElementById('idObjectSinger').value

    const variables = {
        "number": parseInt(numero),
        "title": title,
        "duration": parseFloat(duration),
        "idAuthor": idSinger
    }
    const query = `query SaveSong($number: Int!, $title: String!, $duration: Float!, $idAuthor: String!) {
        saveSong(number: $number, title: $title, duration: $duration, idAuthor: $idAuthor) {
          author {
            _id
          }
          duration
          number
          title
        }
      }`
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query, variables }),
    };
    if (numero != "" && title != "" && duration != "" && idSinger != "") {
        fetch("http://localhost:4000/", options).then(resp => resp.json())
            .then(resp => {
                alert('Canción creada exitosamente!')
                window.location.reload();
                
            })

    } else {
        alert('Campos vacíos!')
    }
}