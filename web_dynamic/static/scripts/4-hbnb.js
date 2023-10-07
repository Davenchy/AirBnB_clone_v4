window.onload = function () {
  const $ = window.$;
  const checkedAmenityIDs = [];
  const checkedAmenityNames = [];
  $("input").on("change", function () {
    if (this.checked) {
      checkedAmenityIDs.push($(this).attr("data-id"));
      checkedAmenityNames.push($(this).attr("data-name"));
    } else {
      checkedAmenityIDs.pop($(this).attr("data-id"));
      checkedAmenityNames.pop($(this).attr("data-name"));
    }
    $("div.amenities h4").text(checkedAmenityNames.join(", "));
  });

  $.ajax("http://0.0.0.0:5001/api/v1/places_search/", {
    type: "POST",
    data: "{}",
    contentType: "application/json",
    success: function (data) {
      console.log(data);
      for (const place of data) {
        $("section.places").append(`<article>
            <div class="title_box">
              <h2>${place.name}</h2>
              <div class="price_by_night">${place.price_by_night}</div>
            </div>
            <div class="information">
              <div class="max_guest">${place.max_guest} Guest</div>
              <div class="number_rooms">${place.number_rooms} Bedroom</div>
              <div class="number_bathrooms">${place.number_bathrooms} Bathroom</div>
            </div>
            <div class="description">
              ${place.description}
            </div>
          </article>`);
      }
    },
  });

  $("button").click(function () {
     $.ajax("http://0.0.0.0:5001/api/v1/places_search/", {
       type: "POST",
       data: {'amenities': checkedAmenityIDs},
       contentType: "application/json",
       success: function (data) {
         console.log(data);
         for (const place of data) {
           $("section.places").append(`<article>
            <div class="title_box">
              <h2>${place.name}</h2>
              <div class="price_by_night">${place.price_by_night}</div>
            </div>
            <div class="information">
              <div class="max_guest">${place.max_guest} Guest</div>
              <div class="number_rooms">${place.number_rooms} Bedroom</div>
              <div class="number_bathrooms">${place.number_bathrooms} Bathroom</div>
            </div>
            <div class="description">
              ${place.description}
            </div>
          </article>`);
         }
       },
     });
  });
};
