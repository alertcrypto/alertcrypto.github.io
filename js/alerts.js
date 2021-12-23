firebase.auth().onAuthStateChanged((user)=>{
    if(!user){
        location.replace("login.html")
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

Notification.requestPermission(permission => {
    if(permission === 'granted') {
        // show notification
    }
});

function CreateAlert()
{
    setInterval( function() {

        var ptr = document.getElementById("aprice").value;
        if(ptr=='')
        {
            ptr = 100000000000000;
        }
    
        var str = document.getElementById("bprice").value;
        if(str=='')
        {
            str = 0;
        }
        console.log(str);
        console.log(ptr);
    
        var price;
        fetch('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC&tsyms=USD')
        .then(res => res.json()) 
        .then(data => price = data.BTC.USD)
        .then(() => { console.log(price)
        if(price > ptr)
        {
        var myNoti = new Notification('CryptoAlert', {
            body: "ALERT: BTC price is now GREATER than your alert price.                  Current price: " +price + " INR"
        });
        document.getElementById("aprice").value = null;
        location.reload();
        }
        else if(price < str)
        {
        var myNoti = new Notification('CryptoAlert', {
            body: "ALERT: BTC price is now LESS than your alert price.                        Current price: " +price + " INR"
        });
        document.getElementById("bprice").value = null;
        location.reload();
    }
    });
    },1000);
}
