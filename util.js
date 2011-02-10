$.extend($.expr[':'],{
    inview: function(a) {
        var st = (document.documentElement.scrollTop || document.body.scrollTop),
            ot = $(a).offset().top,
            wh = (window.innerHeight && window.innerHeight < $(window).height()) ? window.innerHeight : $(window).height();
        return ot > st && ($(a).height() + ot) < (st + wh);
    }
});

function getId(link){
  return link.attr('href').replace(/.*=/, '');
}

function GetAllLinks(){
  return $('a[href^=item?id=]');
}

function GetVisibleLinks(){
  return GetAllLinks().filter(':inview');
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
      if (!isRead) MarkNew(link);
    });
  })
}

function GetSpanId(link){
  return 'new_' + getId($(link));
}

function MarkNew(link){
  var link = $(link);
  var spanId = GetSpanId(link);
  link.after( 
    $('<span>')
      .attr('id', spanId)
      .css('color', 'red')
      .css('font-weight', 'bold')
      .html(" *NEW")
  );
}

function MarkRead(link){
  var link = $(link);
  var spanId = GetSpanId(link);
  $('#' + spanId).css('font-weight', 'normal');
}

