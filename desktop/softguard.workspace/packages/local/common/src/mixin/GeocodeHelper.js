Ext.define("Common.mixin.GeocodeHelper", {
  extend: "Ext.Mixin",

  mixinConfig: {
    id: "geocodehelper",
  },

  updateGeocodeResultCombo: function (win, mapPanel, results, markerTitle) {
    if (!win) {
      return;
    }

    var combo = win.down("#geocodeResults");
    if (!combo) {
      return;
    }

    var store = combo.getStore();
    if (!store) {
      store = win.geocodeResultStore = Ext.create("Ext.data.Store", {
        fields: ["id", "label", "lat", "lng", "raw"],
      });
      combo.bindStore(store);
    }

    var normalized = this.normalizeGeocodeResults(results);
    store.loadData(normalized);

    combo.suspendEvents(false);
    combo.setValue(normalized.length ? normalized[0].id : null);
    combo.resumeEvents();

    if (normalized.length > 1) {
      combo.show();
      combo.setDisabled(false);
    } else {
      combo.hide();
    }

    if (normalized.length === 0) {
      return;
    }
  },

  clearGeocodeResultCombo: function (win) {
    if (!win) {
      return;
    }
    var combo = win.down("#geocodeResults");
    if (combo) {
      combo.reset();
      combo.hide();
      if (combo.getStore()) {
        combo.getStore().removeAll();
      }
    }
  },

  onGeocodeResultSelect: function (win, mapPanel, rawResult, markerTitle) {
    if (!win || !rawResult || !mapPanel) {
      return;
    }

    var coords = this.normalizeGeocodeLocation(
      rawResult.geometry ? rawResult.geometry.location : null
    );

    if (!coords) {
      return;
    }

    var marker = this.placeMarkerOnMap(
      mapPanel,
      coords.lat,
      coords.lng,
      markerTitle
    );

    if (marker) {
      win.mapMarker = marker;
      win.lastGeocodeResult = rawResult;
      win.initialAddress = rawResult.formatted_address || win.initialAddress;
      this.updateMapFormFromResult(win, rawResult);
    }
  },

  updateMapFormFromResult: function (win, result) {
    if (!win || !result) {
      return;
    }

    var formCmp = win.down("form");
    if (!formCmp) {
      return;
    }

    var form = formCmp.getForm();
    if (!form) {
      return;
    }

    var parsed = this.parseGeocodeResult(result);
    var streetField = form.findField("calle");
    if (streetField && parsed.streetLine) {
      streetField.setValue(parsed.streetLine);
    }

    var cityField = form.findField("localidad");
    if (cityField && parsed.city) {
      cityField.setValue(parsed.city);
    }
  },

  normalizeGeocodeResults: function (results) {
    if (!Ext.isArray(results)) {
      return [];
    }

    return Ext.Array.map(
      results,
      function (result, index) {
        var coords = this.normalizeGeocodeLocation(
          result && result.geometry ? result.geometry.location : null
        );

        return {
          id:
            (result && (result.place_id || result.id)) !== undefined
              ? result.place_id || result.id
              : "result-" + index,
          label:
            (result && result.formatted_address) ||
            Ext.String.format(getLocale("Resultado {0}"), index + 1),
          lat: coords ? coords.lat : null,
          lng: coords ? coords.lng : null,
          raw: result,
        };
      },
      this
    );
  },

  parseGeocodeResult: function (result) {
    var components = this.ensureComponentArray(
      result ? result.address_components : null
    );

    var streetNumber = this.findAddressComponent(components, ["street_number"]);
    var routes = this.findAllAddressComponents(components, ["route"]);
    var locality = this.findAddressComponent(components, [
      "locality",
      "sublocality",
      "postal_town",
      "neighborhood",
      "administrative_area_level_3",
    ]);
    var adminLevel2 = this.findAddressComponent(components, [
      "administrative_area_level_2",
    ]);
    var adminLevel1 = this.findAddressComponent(components, [
      "administrative_area_level_1",
    ]);
    var postal = this.findAddressComponent(components, ["postal_code"]);

    var streetLine = this.composeStreetLineFromComponents(routes, streetNumber);
    // Don't use formatted_address as fallback - it contains the full address
    // If there's no street info, leave it empty rather than using city/country

    return {
      streetLine: streetLine || "",
      city:
        (locality && locality.long_name) ||
        (adminLevel2 && adminLevel2.long_name) ||
        "",
      stateName: (adminLevel1 && adminLevel1.long_name) || "",
      postalCode: (postal && postal.long_name) || "",
      components: components,
    };
  },

  ensureComponentArray: function (components) {
    return Ext.isArray(components) ? components : [];
  },

  findAddressComponent: function (components, targetTypes) {
    var match = null;
    Ext.Array.each(components, function (component) {
      if (!component || !Ext.isArray(component.types)) {
        return true;
      }

      var intersects = Ext.Array.intersect(component.types, targetTypes);
      if (intersects && intersects.length > 0) {
        match = component;
        return false;
      }
      return true;
    });
    return match;
  },

  findAllAddressComponents: function (components, targetTypes) {
    var matches = [];
    Ext.Array.each(components, function (component) {
      if (!component || !Ext.isArray(component.types)) {
        return true;
      }

      var intersects = Ext.Array.intersect(component.types, targetTypes);
      if (intersects && intersects.length > 0) {
        matches.push(component);
      }
      return true;
    });
    return matches;
  },

  composeStreetLineFromComponents: function (routes, streetNumber) {
    var streetLine = null;

    if (routes && routes.length > 1) {
      streetLine = Ext.Array.map(routes, function (component) {
        return component.long_name;
      }).join(" & ");
    } else if (routes && routes.length === 1) {
      var parts = [routes[0].long_name];
      if (streetNumber && streetNumber.long_name) {
        parts.push(streetNumber.long_name);
      }
      streetLine = parts.join(" ");
    } else if (streetNumber && streetNumber.long_name) {
      streetLine = streetNumber.long_name;
    }

    return streetLine;
  },

  normalizeGeocodeLocation: function (location) {
    if (!location) {
      return null;
    }

    var latValue = null;
    var lngValue = null;

    if (typeof location.lat === "function") {
      latValue = location.lat();
    } else if (typeof location.latitude === "function") {
      latValue = location.latitude();
    } else if (typeof location.lat !== "undefined") {
      latValue = location.lat;
    } else if (typeof location.latitude !== "undefined") {
      latValue = location.latitude;
    }

    if (typeof location.lng === "function") {
      lngValue = location.lng();
    } else if (typeof location.lon === "function") {
      lngValue = location.lon();
    } else if (typeof location.lng !== "undefined") {
      lngValue = location.lng;
    } else if (typeof location.lon !== "undefined") {
      lngValue = location.lon;
    } else if (typeof location.longitude !== "undefined") {
      lngValue = location.longitude;
    }

    var latNum = parseFloat(latValue);
    var lngNum = parseFloat(lngValue);

    if (isNaN(latNum) || isNaN(lngNum)) {
      return null;
    }

    return {
      lat: latNum,
      lng: lngNum,
    };
  },

  placeMarkerOnMap: function (mapPanel, lat, lng, title) {
    if (!mapPanel || !window.google || !google.maps) {
      return null;
    }

    var map = mapPanel.getMap ? mapPanel.getMap() : null;
    if (!map) {
      return null;
    }

    var position = new google.maps.LatLng(lat, lng);

    if (mapPanel.__organizationMarker) {
      google.maps.event.clearInstanceListeners(mapPanel.__organizationMarker);
      mapPanel.__organizationMarker.setMap(null);
    }

    if (mapPanel.cache && Ext.isArray(mapPanel.cache.marker)) {
      Ext.Array.each(mapPanel.cache.marker, function (marker) {
        marker.setMap(null);
      });
      mapPanel.cache.marker = [];
    }

    var marker = new google.maps.Marker({
      position: position,
      draggable: true,
      title: title || "",
      optimized: false,
    });

    marker.setMap(map);

    google.maps.event.addListener(marker, "dragend", function (evt) {
      map.setCenter(evt.latLng);
    });

    mapPanel.__organizationMarker = marker;
    if (mapPanel.cache) {
      mapPanel.cache.marker = [marker];
    }

    map.setCenter(position);
    if (map.getZoom() < 14) {
      map.setZoom(14);
    }

    return marker;
  },

  geocodeAddressForMap: function (mapPanel, address, title, callback) {
    if (!mapPanel || !address) {
      Ext.callback(callback, this, [false, null, null, "NO_ADDRESS"]);
      return;
    }

    var geocoder = mapPanel.getGeocoder ? mapPanel.getGeocoder() : null;
    if (!geocoder || typeof geocoder.geocode !== "function") {
      Ext.callback(callback, this, [false, null, null, "NO_GEOCODER"]);
      return;
    }

    try {
      geocoder.geocode(
        {
          address: address,
        },
        Ext.bind(
          function (results, status) {
            var success =
              (status === "OK" || status === undefined || status === true) &&
              results &&
              results.length > 0;

            if (success) {
              var coords = this.normalizeGeocodeLocation(
                results[0].geometry ? results[0].geometry.location : null
              );

              if (coords) {
                var marker = this.placeMarkerOnMap(
                  mapPanel,
                  coords.lat,
                  coords.lng,
                  title
                );

                mapPanel.__lastGeocodeResult = results[0];
                Ext.callback(
                  callback,
                  this,
                  [true, marker, results[0], status, results]
                );
                return;
              }
            }

            Ext.callback(
              callback,
              this,
              [false, null, results ? results[0] : null, status, results]
            );
          },
          this
        )
      );
    } catch (error) {
      console.log("Error al solicitar la geocodificación", error);
      Ext.callback(callback, this, [false, null, null, "EXCEPTION"]);
    }
  },
});
