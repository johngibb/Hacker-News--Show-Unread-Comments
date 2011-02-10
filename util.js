$.extend($.expr[':'],{
    inview: function(a) {
        var st = (document.documentElement.scrollTop || document.body.scrollTop),
            ot = $(a).offset().top,
            wh = (window.innerHeight && window.innerHeight < $(window).height()) ? window.innerHeight : $(window).height();
        return ot > st && ($(a).height() + ot) < (st + wh);
    }
});

function ArraysEqual(a, b){
  return a.length == b.length && a.join("|") == b.join("|");
}

function getId(link){
  return link.attr('href').replace(/.*=/, '');
}

function GetAllLinks(){
  return $('a[href^=item?id=]');
}

function GetVisibleLinks(){
  return GetAllLinks().filter(':inview');
}

function GetLinkIds(links){
  return links.map(function(){
    return getId($(this));
  }).toArray();
}

function TrackVisibleLinks(callback){
  var prevLinkIds = [];
  function FireVisibleLinksChanged(){
    var visibleLinks = GetVisibleLinks();
    var visibleLinkIds = GetLinkIds(visibleLinks);
    if (!ArraysEqual(prevLinkIds, visibleLinkIds)){
      callback(visibleLinks);
    }
    prevLinkIds = visibleLinkIds;
  }
  $(document).scroll(FireVisibleLinksChanged);
  FireVisibleLinksChanged();
}


function MarkVisitedLinks(links){
  links.each(function(){
    var link = $(this);
    var id = getId(link);
    CheckLinkId(id, function(isRead){
      SetIsRead(link, isRead);
    });
  })
}

function SetIsRead(link, isRead){
  var link = $(link);
  var block = $(link).closest('td.default');
  if (isRead) {
    block.find("*").css('color', 'grey')
  }
  else {
    link.after( " *NEW");    
  }
}

function TrackNewlyVisibleLinks(callback){
  var seenIds = {}
  TrackVisibleLinks(function(links){
    var newLinks = links.filter(function(){
      var id = getId($(this));
      var seen = (id in seenIds);
      seenIds[id] = true;
      return !seen;
    });
    callback(newLinks);
  });
}