firebase.auth().onAuthStateChanged((user)=>{
    if(!user){
        document.getElementById("user").style.display = 'none';
        document.getElementById("userlogout").style.display = 'none';
    }
    else
    {
        document.getElementById("user").innerHTML = "Hello, "+user.email
        document.getElementById("userlogin").style.display = 'none';
        document.getElementById("usergetstarted").style.display = 'none';
    }
})

function logout()
{
    firebase.auth().signOut()
    location.reload()
}