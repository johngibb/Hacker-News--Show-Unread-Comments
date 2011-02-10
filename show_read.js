var links = $('a[href^=item?id=]');

AddLinkId(1778913);
AddLinkId(1778742);

MarkVisitedLinks(links)

TrackVisibleLinks(function(visibleLinks){
  console.log("Visible: " + GetLinkIds(visibleLinks).join(", "));
})