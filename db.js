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

var linkIdCache = {};
function CheckLinkId(linkId, callback){
  if ( linkId in linkIdCache ){
    callback(true);
  }
  db.transaction(function (tx) {
      tx.executeSql('select * from ReadLinks where linkId = ?', [linkId], function(tx, results){
        var isRead = (results.rows.length > 0);
        if (isRead) linkIdCache[linkId] = true;
        callback(isRead);
      });
    });
}

EnsureTable();