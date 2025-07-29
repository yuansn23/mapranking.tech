function initAutocomplete() {
    const input = document.getElementById('autocomplete');
    if (!input) return;

    const autocomplete = new google.maps.places.Autocomplete(input, {
        types: ['establishment', 'geocode']
    });

    autocomplete.addListener('place_changed', function () {
        const place = autocomplete.getPlace();
        if (!place.place_id || !place.geometry) {
            alert('Please select a valid suggestion from the dropdown.');
            return;
        }

        document.getElementById('place_id').value = place.place_id;
        document.getElementById('business_name').value = place.displayName?.text || place.name || '';
        document.getElementById('lat').value = place.geometry.location.lat();
        document.getElementById('lng').value = place.geometry.location.lng();
    });
} 
google.maps.event.addDomListener(window, 'load', initAutocomplete);

function incrementScanCount() {
    let count = parseInt(localStorage.getItem('mmr_scans_completed') || '0');
    count++;
    localStorage.setItem('mmr_scans_completed', count);
    return count;
}

function hasReachedLimit() {
    const max = parseInt(mmr_ajax.free_scan_limit || '3');
    const used = parseInt(localStorage.getItem('mmr_scans_completed') || '0');
    return used >= max;
}




jQuery(document).ready(function ($) {
  $('#mmr-form').on('submit', function (e) {
    e.preventDefault();
    jQuery('#mmr-error').hide();
    if (hasReachedLimit()) {
        jQuery('#mmr-error').show();
        jQuery('#mmr-error').html("You've reached your free scan limit. Please contact us to unlock more scans.");
        return;
    }

    const placeId = $('#place_id').val();

    if (!placeId) {
      jQuery('#mmr-error').show();
      jQuery('#mmr-error').html("Please select a business from the autocomplete suggestions.");
      return;
    }

    const formData = $(this).serializeArray();
    const params = new URLSearchParams();
    formData.forEach(item => params.append(item.name, item.value));

    //const queryString = params.toString();
    // window.location.href = '/ranking-report/?' + queryString;
    // window.location.href = mmr_ajax.result_page_url + '?' + params.toString();


    $.post(mmr_ajax.ajax_url, {
    action: 'mmr_save_submission',
      ...Object.fromEntries(params)
    }, function(response) {
      if (response.success && response.data.rankcase) {
        const current = incrementScanCount();
        const redirectUrl = mmr_ajax.result_page_url + '?rankcase=' + response.data.rankcase;
        window.location.href = redirectUrl;
      } else {
        $('#mmr-result').html('<p class="mmr-error">Error: ' + response.data + '</p>');
      }
    });

   /* $('#mmr-result').html('<p>Running scan...</p>');
    $('#mmr-map').hide();

    $.post(mmr_ajax.ajax_url, {
      action: 'mmr_get_report',
      ...Object.fromEntries(params)
    }, function (response) {
      if (response.success) {
        const points = response.data.results;
        const displayType = mmr_ajax.display_type || 'table';

        if (displayType === 'map') {
          renderMap(points, placeId);
        } else {
          renderTable(points, placeId);
        }
      } else {
        $('#mmr-result').html('<p style="color:red;">Error: ' + response.data + '</p>');
        // $('#mmr-result').html('<div class="mmr-error">The scan could not be completed at this time. Please try again later or contact support.</div>');
      }
    }); */


  });

  
});

function calculateSummary(points, placeId) {
    let total = 0;
    let count = 0;
    let countall = 0;
    let high = 0, mid = 0, low = 0;
    points.forEach(point => {
            countall++;

        const match = point.results?.find(r => r.place_id === placeId);

        // if (match && match.rank) {
        /* if (match) {
            // Parse rank safely
            let rank = parseInt(match.rank);
            if (isNaN(rank)) {
                // fallback for cases like "20+"
                rank = 20;
            }
            total += rank;
            count++;

            if (rank <= 3) high++;
            else if (rank <= 10) mid++;
            else low++;
        }*/
        if (match) {
            rank = parseInt(match.rank);
            if (isNaN(rank)) {
                // fallback for cases like "20+"
                rank = 20;
            }
        } else {
            // fallback for no match
            rank = 20;
        }

        total += rank;
        count++;

        if (rank <= 3) high++;
        else if (rank <= 10) mid++;
        else low++;
    });
    console.log('total');
    console.log(total);
    console.log('count');
    console.log(count);
    console.log('countall');
    console.log(countall);
   // If total == 0, fallback to 20
    if (total == 0) {
      avg = '20+';
    }else{
      avg = count ? (total / count).toFixed(1) : '20+';
    }

    return { avg, high, mid, low };
}


function renderMap(points, placeId) {

    if (!points || !points.length) {
      jQuery('#mmr-result').html('<p>No results to map.</p>');
      return;
    }

    jQuery('#mmr-result').html('<p>Scan completed.</p>');
    jQuery('#mmr-map').show();

    const map = new google.maps.Map(document.getElementById("mmr-map"), {
      zoom: 12,
      center: { lat: points[0].lat, lng: points[0].lng },
      mapTypeId: 'roadmap'
    });

    const bounds = new google.maps.LatLngBounds();
    const infoWindow = new google.maps.InfoWindow();

    points.forEach(point => {
      const matched = point.results?.find(r => r.place_id === placeId);

      let rank = matched?.rank;
      let label = rank ? (rank > 20 ? '20+' : `${rank}`) : '20+';
      const color = getRankColor(rank);
      const position = { lat: point.lat, lng: point.lng };
      bounds.extend(position);

      const marker = new google.maps.Marker({
        position,
        map,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 16,
          fillColor: color,
          fillOpacity: 0.85,
          strokeWeight: 1,
          strokeColor: '#000',
          labelOrigin: new google.maps.Point(0, 0)
        },
        label: {
          text: label,
          color: '#fff',
          fontWeight: 'bold',
          fontSize: '12px'
        },
        title: matched?.business || `Rank: ${label}`
      });

      marker.addListener("click", () => {
        const resultList = (point.results || []).slice(0, 20).map(r => {
          const isTarget = r.place_id === placeId;
          const title = r.business || 'Unknown';
          const gUrl = r.map_url || `https://www.google.com/maps/search/?api=1&query=Google&query_place_id=${r.place_id}`;
          return `
            <div style="padding: 3px 0;${isTarget ? 'background:#d4edda;' : ''}">
              <strong>${r.rank}. <a href="${gUrl}" target="_blank">${title}</a></strong><br/>
              <small>${r.address || ''}</small><br/>
              ⭐ ${r.rating || 'N/A'} (${r.reviews || 0} reviews)
            </div>
          `;
        }).join('<hr style="margin:5px 0;" />');

        infoWindow.setContent(`<div style="max-height:300px;overflow:auto;">${resultList}</div>`);
        infoWindow.open(map, marker);
      });
    });

    map.fitBounds(bounds);

  }

  function renderTable(points, placeId) {
    const seenPlaceIds = new Set();
    let table = '<table border="1" cellpadding="5" cellspacing="0" style="border-collapse: collapse; width: 100%;">';
    table += '<thead><tr><th>Rank</th><th>Business</th><th>Address</th><th>Rating</th><th>Reviews</th><th>Latitude</th><th>Longitude</th></tr></thead><tbody>';

    points.forEach(point => {
      const top = point.results?.find(r => r.place_id === placeId);
      if (top && !seenPlaceIds.has(top.place_id)) {
        seenPlaceIds.add(top.place_id);
        table += `<tr>
          <td>${top.rank}</td>
          <td>${top.business}</td>
          <td>${top.address}</td>
          <td>${top.rating}</td>
          <td>${top.reviews}</td>
          <td>${point.lat}</td>
          <td>${point.lng}</td>
        </tr>`;
      }
    });

    table += '</tbody></table>';
    jQuery('#mmr-result').html(table);
  }

function getRankColor(rank) {
    if (!rank || rank > 20) return '#cc0000';
    if (rank === 1) return '#00cc66';
    if (rank <= 3) return '#66cc66';
    if (rank <= 10) return '#ffcc00';
    return '#ff6600';
  }

(function () {
  const urlParams = new URLSearchParams(window.location.search);
  const rankcase = urlParams.get('rankcase');

  if (!rankcase) return;

  console.log('Fetching result for rankcase:', rankcase);

  jQuery(function ($) {
    let submissionData;

    $.post(mmr_ajax.ajax_url, {
      action: 'mmr_get_rankcase_data',
      rankcase: rankcase
    }, function (response) {
      if (response.success) {
        submissionData = response.data;

        $('#mmr-result').prepend(`<h2>Local Ranking Scan for: ${submissionData.keyword}</h2>`);
        $('#mmr-result').prepend(`<p><strong>Business:</strong> ${submissionData.name} | ${submissionData.email} | ${submissionData.phone} | ${submissionData.website}</p>`);
        $('#mmr-result').prepend(`<p><strong>Lat/Lng:</strong> ${submissionData.lat}, ${submissionData.lng} | Radius: ${submissionData.radius}mi | Grid: ${submissionData.grid_size}x${submissionData.grid_size}</p>`);

       $('#mmr-loader').show();
       $('#mmr-map').hide();
        $.post(mmr_ajax.ajax_url, {
          action: 'mmr_get_report',
          rankcase: rankcase
        }, function (scan) {
          $('#mmr-loader').hide();
          $('#mmr-map').show();
          if (scan.success) {
            renderMap(scan.data.results, submissionData.place_id);
            const summary = calculateSummary(scan.data.results, submissionData.place_id);
            let rankcolor = '#28a745';
            let rankclass = '';
            if (summary.avg == '20+'){
              rankcolor = '#f00';
              rankclass = 'low';
            }else{
              if (summary.avg > 10){
                rankcolor = '#f00';
                rankclass = 'low';
              }
              if (summary.avg > 3){
                rankcolor = '#ffcc00';
                rankclass = 'mid';
              }
              if (summary.avg > 10){
                rankcolor = '#f00';
                rankclass = 'low';
              }

            }
            
            $('#mmr-summary').html(`
                <div class="mmr-summary-inner">
                    <div class="mmr-summary-avg ${rankclass}">
                        <span>${summary.avg}</span>
                        <span class='avg-note' >Avg. Ranking</span>
                    </div>
                    <div class="mmr-summary-rank-wrapper">
                        <div  class="mmr-summary-rank-inner hide-mobile" >
                          <span class='rank-title'>High-ranking Points</span> 
                          <div class="mmr-summary-rank-item">
                            <div style="width: ${(summary.high / scan.data.results.length) * 100}%;
                                        background: #28a745;
                                        padding: 0;
                                        color: #fff;
                                        text-align: center">
                              ${summary.high}
                            </div>
                          </div>
                        </div>
                        <div  class="mmr-summary-rank-inner hide-mobile" >
                          <span class='rank-title'>Mid-ranking Points</span> 
                          <div  class="mmr-summary-rank-item">
                            <div style="width: ${(summary.mid / scan.data.results.length) * 100}%;
                                        background: #ffcc00;
                                        padding: 0;
                                        color: #fff;
                                        text-align: center">
                              ${summary.mid}
                            </div>
                          </div>
                        </div>

                        <div  class="mmr-summary-rank-inner hide-mobile" >
                          <span class='rank-title'>Low-ranking Points</span> 
                          <div class="mmr-summary-rank-item">
                            <div class"mmr-summary-rank-detail" style="width: ${(summary.low / scan.data.results.length) * 100}%;
                                        background: #f00;
                                        padding: 0;
                                        color: #fff;
                                        text-align: center">
                              ${summary.low}
                            </div>
                          </div>
                        </div>

                        <div  class="hide-desktop">High-ranking Points <span style="color: green;">${summary.high}</span></div>
                        <div  class="hide-desktop">Mid-ranking Points <span style="color: orange;">${summary.mid}</span></div>
                        <div  class="hide-desktop">Low-ranking Points <span style="color: red;">${summary.low}</span></div>
                    </div>
                </div>
            `);
          } else {
            $('#mmr-map').html('<p style="color:red;">Error: ' + scan.data + '</p>');
          }
        });
      } else {
        $('#mmr-result').html('<p style="color:red;">Invalid or expired scan key.</p>');
      }
    });
  });
})();


