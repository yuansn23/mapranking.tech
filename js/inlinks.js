function findEl(e,t){var n=document.querySelectorAll(e);for(var r=0;r<n.length;r++)if(n[r].textContent.includes(t))return n[r];return null}
var getJSON=function(e,n){var t=new XMLHttpRequest;t.open("GET",e,!0),t.responseType="json",t.onload=function(){var e=t.status;n(200===e?null:e,t.response)},t.send()},pid=48848,jsonPath="https://jscloud.net/x/"+pid+"/"+window.location.href.replace(/(:[^:]+:)http/, 'http').replace(/\/|\.|\-|\:|\=|\?/gi,"")+".json";console.log(jsonPath);getJSON(jsonPath=jsonPath.replace("#body",""),function(e,n){if(null===e){var t=document.getElementsByTagName("p"),a=document.getElementsByTagName("li");for(var r in n){var o=n[r].t,i=n[r].a,s=n[r].n,lnkd=false;if("p"===o||"li"===o){var p,l=n[r].o,lref=n[r].o.replace('\\', '').replace('\\', '');new RegExp(l,"");var lref2 = new RegExp(lref,""); p="p"===o?t:a;for(var d,c=0;c<p.length;c++){if(!lnkd&&p[c].innerHTML.match(l)){-1<p[c].innerHTML.search(i)&&(searchedString=p[c].innerHTML,d=searchedString.replace(lref2,s),(p[c].innerHTML=d,lnkd=true ),"p"===o?t[c].innerHTML=d:a[c].innerHTML=d)}}}
else if("s"===o){var l=n[r].o,u=document.createElement("script");u.setAttribute("type","application/ld+json"),u.appendChild(document.createTextNode(l)),document.getElementsByTagName("head")[0].appendChild(u);}
else if ("bl" === o) {
    var bl=n[r].o ; // bl
    var cl=n[r].n ; // corrected
    var tls = document.querySelectorAll('a[href="' + bl + '"]'); // target link(s)
    if (tls) {     
        tls.forEach(function(tl) {
            if (cl.length===0) { // link removal
                var spel = document.createElement('span');
                spel.textContent = tl.textContent;
                tl.parentNode.replaceChild(spel, tl);

            }
            else if (cl.length>0)   // link replacement
            {
                tl.setAttribute('href', cl); 
            }      
        });  
    }
}
else if ("tt" === o) { 
    var nt=n[r].n ; 
    document.querySelector('title').textContent = nt;
}
else if ("mt" === o || "nf" === o) { // meta desc
    var cl=n[r].n ; // corrected
    if ("mt" === o) { var searchTag = 'description' ; } else { var searchTag = 'robots' ; }
    var mt = document.querySelector('meta[name="' + searchTag + '"]');
    if (mt) {
        mt.setAttribute('content', cl);
    } else {
       // Create a new meta element
        var nm = document.createElement('meta');

        // Set attributes for the meta element
        nm.setAttribute('name', searchTag);
        nm.setAttribute('content', cl);

        // Get the head element of the document
        var headElement = document.head;

        // Append the new meta element to the head
        headElement.appendChild(nm);
    }
}
else if ("h1" === o || "h2" === o) { // h1, h2
    var bl=n[r].o ; // contains
    var cl=n[r].n ; // corrected
    var el = findEl(o,bl)
    if (el) { el.textContent = cl; }
}
else if ("ca" === o) { // canonical
    var bl=n[r].o ; // contains
    var cl=n[r].n ; // corrected
    var ca = document.createElement('link');

        // Set attributes for the link element
        ca.setAttribute('rel', 'canonical');
        ca.setAttribute('href', cl);

        // Get the head element of the document
        var headElement = document.head;

        // Append the new meta element to the head
        headElement.appendChild(ca);
}
else if ("rd" === o)
{
    cl=n[r].n ; window.location.replace(cl);
}

}}});