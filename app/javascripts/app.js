var accounts;
var account;
var balance;
var colleagueNames = ["Bart", "Steffie", "Stijn", "Thomas", "Wouter"];

function setStatus(message) {
  $('#status').text(message);
};

function refreshBalance() {
  var meta = KudosCoin.deployed();

  var colleagues = $('#colleagues');
  colleagues.empty();

  for (var i=0; i<accounts.length; i++){
      var currentAccount = accounts[i];

      var blockie = blockies.create({ seed: accounts[i]});
      blockie.addEventListener('click', function() { $('#receiver').val(event.srcElement.id) }, false);
      blockie.id = currentAccount;

      var colleagueInfo = $('<td>').append($('<b>').text(colleagueNames[i]));
      var kudos = $('<td>').attr("id","Kudos" + currentAccount);

      getBalance(meta, currentAccount);

      colleagues.append($('<tr>').append($('<td>').add(blockie)).append(colleagueInfo).append(kudos));
  }

  meta.getBalance.call(account, {from: account}).then(function(value) {
    $('#balance').text(value.valueOf());
  }).catch(function(e) {
    console.log(e);
    setStatus("Error getting balance; see log.");
  });
};

function getBalance(meta, currentAccount) {
  meta.getBalance.call(currentAccount, {from: currentAccount}).then(function(balance) {
        $('#Kudos' + currentAccount).text(balance.toNumber() + " Kudos");
      }).catch(function(e) {
        console.log(e);
      })
};

function sendCoin() {
  var meta = KudosCoin.deployed();

  var amount = parseInt($('#amount').val());
  var receiver = $('#receiver').val();

  setStatus("Initiating transaction... (please wait)");

  meta.sendCoin(receiver, amount, {from: account}).then(function() {
    setStatus("Transaction complete!");
    refreshBalance();
  }).catch(function(e) {
    console.log(e);
    setStatus("Error sending coin; see log.");
  });

  $('#amount').val("");
  $('#receiver').val("");
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
