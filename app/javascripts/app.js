var accounts;
var account;
var balance;
var colleagueNames = ["Bart", "Steffie", "Stijn", "Thomas", "Wouter"];

function setStatus(message) {
  var status = document.getElementById("status");
  status.innerHTML = message;
};

function refreshBalance() {
  var meta = KudosCoin.deployed();

  var colleagues = document.getElementById("colleagues");

  var ul=document.createElement('ul');

  colleagues.appendChild(ul);

  for (var i=0; i<accounts.length; i++){

      var li=document.createElement('li');
      var blockie = blockies.create({ seed: accounts[i]});
      var colleagueInfo = document.createElement("p");
      var kudos = document.createElement("p");
      colleagueInfo.innerHTML = colleagueNames[i] + " <small>(" + accounts[i] + ")</small>";
      var currentAccount = accounts[i];
      kudos.id = "Kudos" + currentAccount;

      getBalance(meta, currentAccount);

      ul.appendChild(li);
      li.appendChild(blockie);
      li.appendChild(colleagueInfo);
      li.appendChild(kudos);
      
  }

  meta.getBalance.call(account, {from: account}).then(function(value) {
    var balance_element = document.getElementById("balance");
    balance_element.innerHTML = value.valueOf();
  }).catch(function(e) {
    console.log(e);
    setStatus("Error getting balance; see log.");
  });
};

function getBalance(meta, currentAccount) {
  meta.getBalance.call(currentAccount, {from: currentAccount}).then(function(balance) {
        var currentKudos = document.getElementById("Kudos" + currentAccount);
        currentKudos.innerHTML = "Kudos: " + balance.toNumber();
      }).catch(function(e) {
        console.log(e);
      })
};

function sendCoin() {
  var meta = KudosCoin.deployed();

  var amount = parseInt(document.getElementById("amount").value);
  var receiver = document.getElementById("receiver").value;

  setStatus("Initiating transaction... (please wait)");

  meta.sendCoin(receiver, amount, {from: account}).then(function() {
    setStatus("Transaction complete!");
    refreshBalance();
  }).catch(function(e) {
    console.log(e);
    setStatus("Error sending coin; see log.");
  });
};

window.onload = function() {
  web3.eth.getAccounts(function(err, accs) {
    if (err != null) {
      alert("There was an error fetching your accounts.");
      return;
    }

    if (accs.length == 0) {
      alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
      return;
    }

    accounts = accs;
    account = accounts[0];

    refreshBalance();
  });
}
