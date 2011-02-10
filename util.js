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
  function FireVisibleLinksChanged(){
    callback(GetVisibleLinks());
  }
  $(document).scroll(FireVisibleLinksChanged);
  FireVisibleLinksChanged();
}


function MarkVisitedLinks(links){
  links.each(function(){
    var link = $(this);
    var id = getId(link);
    CheckLinkId(id, function(isRead){
      SetIsNew(link, !isRead);
    });
  })
}

function SetIsNew(link, isNew){
  var link = $(link);
  var spanId = 'new_' + getId(link);
  if (isNew){
    if ($('#' + spanId).length == 0){
      link.after( 
        $('<span>')
          .attr('id', spanId)
          .css('color', 'red')
          .css('font-weight', 'bold')
          .html(" *NEW")
      );
    }
  }
  else {
    $('#' + spanId).css('font-weight', 'normal');
  }
}

