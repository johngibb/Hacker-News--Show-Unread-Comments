var db = openDatabase('ReadLinks', '1.0', 'readlinks', 2 * 1024 * 1024);

function EnsureTable(){
  db.transaction(function (tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS ReadLinks (linkId int unique)');
  })
}

function AddLinkId(linkId){
  db.transaction(function (tx) {
    tx.executeSql('INSERT INTO ReadLinks (linkId) VALUES (?)', [linkId]);
  });
}

function CheckLinkId(linkId, callback){
  db.transaction(function (tx) {
    tx.executeSql('select * from ReadLinks where linkId = ?', [linkId], function(tx, results){
      var isRead = (results.rows.length > 0);
      callback(isRead);
    });
  });
}

EnsureTable();