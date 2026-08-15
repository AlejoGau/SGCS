Ext.define("SGWebCrm.controller.OrganizationFromCuentaGridController", {
  extend: "Ext.app.Controller",
  stores: [],
  models: ["OrganizationCuentaRangoSearchModel"],
  views: ["OrganizationFromCuentaGridView"],

  init: function (config) {
    // genero los eventos
    this.control({
      organizationfromcuentagridview: {
        afterrender: this.initView,
      },
      "organizationfromcuentagridview button[action=search]": {
        click: this.onSearchClick,
      },
      "organizationfromcuentagridview button[action=getall]": {
        click: this.onGetAllClick,
      },
      "organizationfromcuentagridview button[action=crearFromCuenta]": {
        click: this.onCrearFromCuentaClick,
      },
    });
  },

  initView: function (view) {
    var status = view.forceStatus;

    view.filters = [
      {
        property: "GetSqlFilter_CuentasByNotOrganization:Function",
        value: 0, // mando 0 para que tome todas las organizaciones, record.get('Id')
      },
    ];

    var store = Ext.create("Ext.data.Store", {
      model: this.getOrganizationCuentaRangoSearchModelModel(),
      remoteFilter: true,
      remoteSort: true,
      filters: view.filters,
      autoload: false,
    });

    var controller = this;

    view.bindStore(store);
    var toolbar = view.down("pagingtoolbar");
    toolbar.bindStore(store);

    store.load();
  },

  onGetAllClick: function (button, event, options) {
    var view = button.up("organizationfromcuentagridview");
    var store = view.getStore();
    store.clearFilter(true); // tomar los filtros de base.
    store.filter(view.filters);

    // borrar los campos de filtros
    view.down("#query").setValue("");
    var buttons = view.query('button[toggleGroup="filter"]');

    Ext.Array.each(buttons, function (btn) {
      btn.toggle(false, true);
    });
  },

  onSearchClick: function (button, event, options) {
    var view = button.up("organizationfromcuentagridview");
    var store = view.getStore();
    var query = view.down("#query");
    var queryType = view.down("#queryType");

    var filters = Ext.Array.clone(view.filters);

    filters.push({
      property: queryType.getValue(),
      value: query.getValue(),
      id: queryType.getValue(),
    });

    store.currentPage = 1;
    store.clearFilter(true);
    store.filter(filters);
  },

  onCrearFromCuentaClick: function (button, event, options) {
    var view = button.up("organizationfromcuentagridview");
    var store = view.getStore();
    var selected = view.getSelectionModel().getSelection();

    var API_BASE = "/rest/Search/OrganizationOAT";

    var normalize = function (s) {
      return (s || "").toString().trim().toLowerCase();
    };

    var getAllCandidateRecords = function () {
      return (selected && selected.length ? selected : store.getRange()).filter(
        Boolean
      );
    };

    var fetchExistingByName = function (name) {
      return new Ext.Promise(function (resolve) {
        Ext.Ajax.request({
          url: API_BASE,
          method: "GET",
          params: {
            _dc: Date.now(),
            page: 1,
            start: 0,
            limit: 5, 
            sort: Ext.encode([{ property: "o.name", direction: "asc" }]),
            filter: Ext.encode([{ property: "o.[Name]:LIKE", value: name }]),
          },
          success: function (resp) {
            try {
              var payload = Ext.decode(resp.responseText, true) || {};
              var rows = payload.data || payload.rows || [];
              var key = normalize(name);
              var matched = rows
                .map(function (row) {
                  return (
                    row &&
                    (row.Name || row["o.name"] || row.name || row["o.Name"])
                  );
                })
                .filter(Boolean)
                .map(String);

              var exactExists = matched.some(function (n) {
                return normalize(n) === key;
              });

              resolve({
                key: key,
                exists: !!exactExists,
                matchedNames: matched,
              });
            } catch (e) {
              resolve({ key: normalize(name), exists: false });
            }
          },
          failure: function () {
            resolve({ key: normalize(name), exists: false });
          },
        });
      });
    };

    var candidates = getAllCandidateRecords();
    if (!candidates.length) {
      notifyError("No hay cuentas sin entidad para generar.");
      return;
    }

    var uniqueNames = Array.from(
      new Set(
        candidates
          .map(function (r) {
            return r.get("Name");
          })
          .filter(Boolean)
          .map(normalize)
      )
    );

    var normToOriginal = {};
    candidates.forEach(function (r) {
      var n = normalize(r.get("Name"));
      if (!normToOriginal[n]) normToOriginal[n] = new Set();
      normToOriginal[n].add(r.get("Name"));
    });

    Ext.Promise.all(
      uniqueNames.map(function (n) {
        var anyOriginal =
          (normToOriginal[n] && Array.from(normToOriginal[n])[0]) || n;
        return fetchExistingByName(anyOriginal);
      })
    ).then(function (results) {
      var existingSet = new Set(
        results
          .filter(function (r) {
            return r.exists;
          })
          .map(function (r) {
            return r.key;
          })
      );

      var toCreate = candidates.filter(function (r) {
        return !existingSet.has(normalize(r.get("Name")));
      });

      var cuentas = toCreate
        .map(function (r) {
          return r.get("cue_iid");
        })
        .filter(Boolean)
        .join(",");

      var ignoredCount = candidates.length - toCreate.length;
      if (ignoredCount > 0) {
        var ignoredNames = [];
        results.forEach(function (r) {
          if (r.exists) {
            var originals = normToOriginal[r.key]
              ? Array.from(normToOriginal[r.key])
              : [];
            ignoredNames = ignoredNames.concat(
              originals.length ? originals : []
            );
          }
        });
        ignoredNames = Array.from(new Set(ignoredNames)).slice(0, 5);
        notify(
          "Algunas cuentas ya tienen organización y se ignorarán (" +
            ignoredCount +
            "). " +
            (ignoredNames.length
              ? "Ej: " +
                ignoredNames.join(", ") +
                (ignoredCount > ignoredNames.length ? "…" : "")
              : "")
        );
      }

      if (!toCreate.length) {
        notifyError(
          "Todas las cuentas seleccionadas ya tienen organización. No hay nada para crear."
        );
        return;
      }

      var msgText = getLocale(
        "Se van a crear {registros} entidades. Utilizando datos de cuentas."
      ).replace(/\{registros\}/, toCreate.length);

      var url = "/Rest/Search/CreateOrganizationForOrphanCuenta";
      if (cuentas) {
        url += "?idcuenta=" + encodeURIComponent(cuentas);
      }

      Ext.MessageBox.show({
        title: "Crear Entidades",
        buttons: Ext.MessageBox.YESNO,
        msg: msgText,
        fn: function (btn) {
          if (btn === "yes") {
            Ext.Ajax.request({
              url: url,
              success: function () {
                notify("Cuentas creadas con exito");
                view.down("pagingtoolbar").doRefresh();
                view.up().close();
              },
              failure: function (resp) {
                notifyError(
                  "No se pudieron crear las cuentas. Código: " + resp.status
                );
              },
            });
          }
        },
      });
    });
  },
});
