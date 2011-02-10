var links = $('a[href^=item?id=]');

AddLinkId(1778913);
AddLinkId(1778742);
AddLinkId(781559);


TrackVisibleLinks(function(visibleLinks){
  MarkVisitedLinks(visibleLinks)
})