function profileGitHub(user){
  return new Promise((response, reject) => {
    var xhr = new XMLHttpRequest()
    xhr.open('GET', 'https://api.github.com/users/' + user)
    xhr.send(null)

    xhr.onreadystatechange = () => {
      if(xhr.readyState === 4){
        if(xhr.status === 200){
          response(JSON.parse(xhr.responseText))
        } else {
          reject("Ops, algo deu errado")
        }
      }
    }
  })
}

function getInfo(username){
  userInput = document.querySelector('input[name=user]').value
  
  user = userInput == '' ? username : userInput
  
  loading = document.querySelector('.loading')
  loading.classList.remove('invisible')

  profileGitHub(user)
    .then((response) => {
      console.log(response)
      
      // Time to show loading screen
      setTimeout(() => {
        loading.classList.add('invisible')
      }, 500)

      createProfile(response)
    })
    .catch((error) => {
      console.log(error)
    
      setTimeout(() => {
        loading.classList.add('invisible')
      }, 500)
    })

}

function createProfile(response){
  var picture = document.querySelector('.profile-picture')
  picture.style.backgroundImage = 'url("' + response.avatar_url + '")'
  
  var name = document.querySelector('.text-info > h2')
  name.innerHTML = response.name
  
  var username = document.querySelector('.text-info > p')
  username.innerHTML = '@' + response.login
  
  var followers = document.querySelector('.followers > span')
  followers.innerHTML = response.followers
  
  var following = document.querySelector('.following > span')
  following.innerHTML = response.following
  
  var repos = document.querySelector('.repos > span')
  repos.innerHTML = response.public_repos
}

// Default Profile
getInfo("VictorPubh")
