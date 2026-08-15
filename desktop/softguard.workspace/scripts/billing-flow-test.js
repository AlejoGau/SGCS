/**
 * ============================================================================
 * BILLING FLOW TEST — SoftGuard WebMG
 * ============================================================================
 *
 * Script de verificación automática del circuito de facturación.
 * Se ejecuta en la consola del navegador (F12) con la sesión de WebMG activa.
 *
 * USO:
 *   1. Abrir WebMG en el navegador y loguearse
 *   2. Abrir la consola del navegador (F12 → Console)
 *   3. Copiar y pegar todo este script
 *   4. Ejecutar: BillingTest.runAll()
 *
 * MODOS:
 *   BillingTest.runAll()         → Ejecuta TODAS las verificaciones (solo lectura)
 *   BillingTest.runAll(true)     → Ejecuta todo + pasos de escritura (crea datos de prueba)
 *   BillingTest.checkConfig()    → Solo verifica la configuración previa
 *   BillingTest.checkOrg(orgId)  → Verifica una organización específica
 *   BillingTest.checkFilters(orgId) → Verifica filtros por org facturadora
 *
 * IMPORTANTE: Los pasos de escritura (createTest=true) crean datos reales.
 *             Usar solo en ambientes de testing/QA.
 * ============================================================================
 */
var BillingTest = (function () {
  "use strict";

  // ── Helpers ──────────────────────────────────────────────────────────────

  var results = [];
  var indent = 0;

  function log(msg, type) {
    var prefix = Array(indent + 1).join("  ");
    var icon =
      type === "pass"
        ? "✅"
        : type === "fail"
          ? "❌"
          : type === "warn"
            ? "⚠️"
            : type === "section"
              ? "📋"
              : "ℹ️";
    var entry = { msg: msg, type: type || "info", icon: icon };
    results.push(entry);
    console.log(
      "%c" + prefix + icon + " " + msg,
      type === "fail"
        ? "color:red;font-weight:bold"
        : type === "pass"
          ? "color:green"
          : type === "warn"
            ? "color:orange"
            : type === "section"
              ? "color:blue;font-weight:bold;font-size:14px"
              : "",
    );
  }

  function section(title) {
    log(title, "section");
  }

  function pass(msg) {
    log(msg, "pass");
  }

  function fail(msg) {
    log(msg, "fail");
  }

  function warn(msg) {
    log(msg, "warn");
  }

  function info(msg) {
    log(msg, "info");
  }

  /**
   * Hace un GET a un endpoint REST search y devuelve una Promise con los rows.
   */
  function restSearch(searchName, filters, extraParams) {
    return new Ext.Promise(function (resolve, reject) {
      var params = Ext.apply({}, extraParams || {});
      if (filters && filters.length > 0) {
        params.filter = Ext.encode(filters);
      }
      params.page = params.page || 1;
      params.start = params.start || 0;
      params.limit = params.limit || 50;

      Ext.Ajax.request({
        url: "/Rest/search/" + searchName,
        method: "GET",
        params: params,
        success: function (resp) {
          try {
            var data = Ext.decode(resp.responseText);
            resolve(data.rows || data || []);
          } catch (e) {
            reject(
              "Error parseando respuesta de " + searchName + ": " + e.message,
            );
          }
        },
        failure: function (resp) {
          reject(
            "Error HTTP " +
              resp.status +
              " en " +
              searchName +
              ": " +
              resp.statusText,
          );
        },
      });
    });
  }

  /**
   * Hace un GET/POST a un endpoint REST CRUD y devuelve una Promise.
   */
  function restCrud(entity, method, data, id) {
    return new Ext.Promise(function (resolve, reject) {
      var url = "/Rest/" + entity + "/";
      if (id) url += id;

      var config = {
        url: url,
        method: method || "GET",
        success: function (resp) {
          try {
            resolve(Ext.decode(resp.responseText));
          } catch (e) {
            resolve(resp.responseText);
          }
        },
        failure: function (resp) {
          reject(
            "Error HTTP " +
              resp.status +
              " en " +
              entity +
              ": " +
              resp.statusText,
          );
        },
      };

      if (data && (method === "POST" || method === "PUT")) {
        config.jsonData = data;
      }

      Ext.Ajax.request(config);
    });
  }

  // ── Verificaciones de Configuración ───────────────────────────────────

  /**
   * Paso 0: Verifica que exista la configuración base necesaria.
   */
  function checkConfig() {
    results = [];
    section("PASO 0: Verificación de configuración previa");

    return checkOrganizaciones()
      .then(function (orgs) {
        return checkCategoriasImpositivas(orgs)
          .then(function () {
            return checkCondicionesPago(orgs);
          })
          .then(function () {
            return checkTiposComprobante(orgs);
          })
          .then(function () {
            return checkFormasPago(orgs);
          })
          .then(function () {
            return checkProductos();
          })
          .then(function () {
            return checkListasPrecios(orgs);
          });
      })
      .then(function () {
        printSummary();
      })
      .catch(function (err) {
        fail("Error inesperado: " + err);
        printSummary();
      });
  }

  function checkOrganizaciones() {
    section("Organizaciones Facturadoras");
    return restCrud("t_organizacion_fc", "GET").then(function (data) {
      var rows = data.rows || data || [];
      if (rows.length === 0) {
        fail("No hay organizaciones facturadoras creadas");
        return [];
      }
      pass(rows.length + " organización(es) facturadora(s) encontrada(s)");
      rows.forEach(function (org) {
        info(
          "  Org #" +
            (org.Id || org.org_icodigo_ID) +
            ": " +
            org.org_cnombre +
            " | CUIT: " +
            (org.org_cidentificacion || "N/A") +
            " | Fact.Elect: " +
            (org.org_factelect || "No"),
        );
      });
      return rows;
    });
  }

  function checkCategoriasImpositivas(orgs) {
    section("Categorías Impositivas (por organización)");
    var chain = Ext.Promise.resolve();
    orgs.forEach(function (org) {
      chain = chain.then(function () {
        var orgId = org.Id || org.org_icodigo_ID;
        return restSearch("t_categorias_impositivas_fc", [
          { property: "cat_orgicodigoid", value: orgId },
        ]).then(function (rows) {
          if (rows.length === 0) {
            fail(
              "Org '" +
                org.org_cnombre +
                "' (ID:" +
                orgId +
                ") NO tiene categorías impositivas",
            );
          } else {
            pass(
              "Org '" +
                org.org_cnombre +
                "': " +
                rows.length +
                " categoría(s) → " +
                rows
                  .map(function (r) {
                    return r.cat_cdescripcion;
                  })
                  .join(", "),
            );
          }
        });
      });
    });
    return chain;
  }

  function checkCondicionesPago(orgs) {
    section("Condiciones de Pago (por organización)");
    var chain = Ext.Promise.resolve();
    orgs.forEach(function (org) {
      chain = chain.then(function () {
        var orgId = org.Id || org.org_icodigo_ID;
        return restSearch("t_condiciones_pago_fc", [
          { property: "con_orgidcodigoid", value: orgId },
        ]).then(function (rows) {
          if (rows.length === 0) {
            fail("Org '" + org.org_cnombre + "' NO tiene condiciones de pago");
          } else {
            pass(
              "Org '" +
                org.org_cnombre +
                "': " +
                rows.length +
                " condición(es) → " +
                rows
                  .map(function (r) {
                    return r.con_cdescripcion || r.con_ccodigo;
                  })
                  .join(", "),
            );
          }
        });
      });
    });
    return chain;
  }

  function checkTiposComprobante(orgs) {
    section("Tipos de Comprobante (por organización)");
    var chain = Ext.Promise.resolve();
    orgs.forEach(function (org) {
      chain = chain.then(function () {
        var orgId = org.Id || org.org_icodigo_ID;
        return restSearch("t_comprobantes_fc", [
          { property: "cbt_idOrganizacionFacturadora", value: orgId },
        ]).then(function (rows) {
          if (rows.length === 0) {
            fail("Org '" + org.org_cnombre + "' NO tiene tipos de comprobante");
          } else {
            var facturas = rows.filter(function (r) {
              return r.cbt_ntipo === 1;
            });
            var recibos = rows.filter(function (r) {
              return r.cbt_ntipo === 7;
            });
            if (facturas.length === 0) {
              fail(
                "Org '" +
                  org.org_cnombre +
                  "': tiene comprobantes pero NINGUNA factura (tipo=1)",
              );
            }
            if (recibos.length === 0) {
              fail(
                "Org '" +
                  org.org_cnombre +
                  "': tiene comprobantes pero NINGÚN recibo (tipo=7)",
              );
            }
            pass(
              "Org '" +
                org.org_cnombre +
                "': " +
                rows.length +
                " tipo(s) (" +
                facturas.length +
                " facturas, " +
                recibos.length +
                " recibos)",
            );
          }
        });
      });
    });
    return chain;
  }

  function checkFormasPago(orgs) {
    section("Formas de Pago");
    return restSearch("t_formas_pago_fc").then(function (rows) {
      if (rows.length === 0) {
        fail("No hay formas de pago creadas");
      } else {
        pass(
          rows.length +
            " forma(s) de pago → " +
            rows
              .map(function (r) {
                return r.fpg_cdescripcion || r.Name;
              })
              .join(", "),
        );
      }
    });
  }

  function checkProductos() {
    section("Productos");
    return restSearch("product").then(function (rows) {
      if (rows.length === 0) {
        fail("No hay productos creados");
      } else {
        pass(rows.length + " producto(s) encontrado(s)");
        // Mostrar los primeros 5
        rows.slice(0, 5).forEach(function (r) {
          info(
            "  " +
              (r.Code || "?") +
              " - " +
              (r.Name || r.pro_cdescripcion || "?"),
          );
        });
        if (rows.length > 5) info("  ... y " + (rows.length - 5) + " más");
      }
    });
  }

  function checkListasPrecios(orgs) {
    section("Listas de Precios (por organización)");
    var chain = Ext.Promise.resolve();
    orgs.forEach(function (org) {
      chain = chain.then(function () {
        var orgId = org.Id || org.org_icodigo_ID;
        return restSearch("MG_listas_precios", [
          { property: "mglp_idorganizacion", value: orgId },
        ]).then(function (rows) {
          if (rows.length === 0) {
            warn(
              "Org '" +
                org.org_cnombre +
                "' NO tiene listas de precios (puede no ser necesario)",
            );
          } else {
            pass(
              "Org '" +
                org.org_cnombre +
                "': " +
                rows.length +
                " lista(s) de precios",
            );
          }
        });
      });
    });
    return chain;
  }

  // ── Verificación de filtros ─────────────────────────────────────────

  /**
   * Verifica que los filtros por organización funcionen correctamente.
   * Compara datos sin filtro vs con filtro para detectar fugas.
   */
  function checkFilters(orgId) {
    results = [];
    section("VERIFICACIÓN DE FILTROS por Org #" + orgId);

    return checkFilterEntity(
      "Categorías Impositivas",
      "t_categorias_impositivas_fc",
      "cat_orgicodigoid",
      "cat_cdescripcion",
      orgId,
    )
      .then(function () {
        return checkFilterEntity(
          "Condiciones de Pago",
          "t_condiciones_pago_fc",
          "con_orgidcodigoid",
          "con_cdescripcion",
          orgId,
        );
      })
      .then(function () {
        return checkFilterEntity(
          "Tipos de Comprobante",
          "t_comprobantes_fc",
          "cbt_idOrganizacionFacturadora",
          "cbt_cdescripcion",
          orgId,
        );
      })
      .then(function () {
        return checkFilterEntity(
          "Listas de Precios",
          "MG_listas_precios",
          "mglp_idorganizacion",
          "Name",
          orgId,
        );
      })
      .then(function () {
        printSummary();
      })
      .catch(function (err) {
        fail("Error: " + err);
        printSummary();
      });
  }

  function checkFilterEntity(
    label,
    searchName,
    filterProp,
    displayProp,
    orgId,
  ) {
    return Ext.Promise.all([
      restSearch(searchName),
      restSearch(searchName, [{ property: filterProp, value: orgId }]),
    ]).then(function (results) {
      var all = results[0];
      var filtered = results[1];

      if (all.length === 0) {
        warn(label + ": No hay datos en total");
        return;
      }

      if (filtered.length === 0) {
        fail(
          label +
            ": Sin filtro hay " +
            all.length +
            " registros, pero con filtro por Org #" +
            orgId +
            " devuelve 0",
        );
        return;
      }

      if (filtered.length === all.length && all.length > 1) {
        warn(
          label +
            ": El filtro devuelve TODOS los registros (" +
            all.length +
            "). " +
            "¿Solo hay datos de una org o el filtro no funciona?",
        );
      } else {
        pass(
          label +
            ": " +
            filtered.length +
            " de " +
            all.length +
            " total (filtro OK)",
        );
      }

      filtered.forEach(function (r) {
        info("  → " + (r[displayProp] || r.Name || "?"));
      });
    });
  }

  // ── Verificación de Clientes Contables ───────────────────────────────

  function checkClientesContables() {
    section("Clientes Contables (m_clientes_fc)");
    return restSearch("m_clientes_fc").then(function (rows) {
      if (rows.length === 0) {
        warn(
          "No hay clientes contables creados (se crean al asignar info contable)",
        );
      } else {
        pass(rows.length + " cliente(s) contable(s)");
        rows.slice(0, 10).forEach(function (r) {
          var orgOk = r.cli_iorganizacion && r.cli_iorganizacion > 0;
          var catOk =
            r.cli_ccategoriaimpositiva && r.cli_ccategoriaimpositiva !== "";
          var condOk = r.cli_ccondicionpago && r.cli_ccondicionpago !== "";

          var status = orgOk && catOk && condOk ? "✅" : "⚠️";
          info(
            "  " +
              status +
              " #" +
              r.cli_icodigo_ID +
              " " +
              r.cli_cnombre +
              " | Org:" +
              (r.cli_iorganizacion || "FALTA") +
              " | Cat:" +
              (r.cli_ccategoriaimpositiva || "FALTA") +
              " | Cond:" +
              (r.cli_ccondicionpago || "FALTA"),
          );
        });
        if (rows.length > 10) info("  ... y " + (rows.length - 10) + " más");
      }
      return rows;
    });
  }

  // ── Verificación de Contratos ────────────────────────────────────────

  function checkContratos() {
    section("Contratos (crm_contrato)");
    return restSearch("crm_contrato").then(function (rows) {
      if (rows.length === 0) {
        warn("No hay contratos creados");
      } else {
        var estados = {
          0: "Pendiente",
          1: "Activo",
          2: "Cancelado",
          3: "Vencido",
        };
        var conteo = {};
        rows.forEach(function (r) {
          var est =
            estados[r.cnt_estado] || "Desconocido(" + r.cnt_estado + ")";
          conteo[est] = (conteo[est] || 0) + 1;
        });

        pass(rows.length + " contrato(s) encontrado(s)");
        Object.keys(conteo).forEach(function (est) {
          var icon =
            est === "Activo" ? "🟢" : est === "Pendiente" ? "🟡" : "⚪";
          info("  " + icon + " " + est + ": " + conteo[est]);
        });

        // Verificar que los activos tengan fecha de vencimiento
        var activos = rows.filter(function (r) {
          return r.cnt_estado === 1;
        });
        var sinVto = activos.filter(function (r) {
          return !r.cnt_fechavto;
        });
        if (sinVto.length > 0) {
          warn(
            "  Hay " +
              sinVto.length +
              " contrato(s) activo(s) sin fecha de vencimiento",
          );
        }
      }
      return rows;
    });
  }

  // ── Verificación de Comprobantes ─────────────────────────────────────

  function checkComprobantes() {
    section("Comprobantes / Facturas (m_comprobantes_cab_fc)");
    return restSearch("m_comprobantes_cab_fc").then(function (rows) {
      if (rows.length === 0) {
        warn("No hay comprobantes/facturas generados");
      } else {
        pass(rows.length + " comprobante(s)");
        rows.slice(0, 10).forEach(function (r) {
          info(
            "  " +
              (r._ncomprobante ||
                r.cbc_cprefijocbte + "-" + r.cbc_inumerocbte) +
              " | " +
              (r.cbt_cdescripcion || "") +
              " | Total: " +
              (r.mon_csymbol || "$") +
              r.cbc_ytotal +
              " | Saldo: " +
              (r.mon_csymbol || "$") +
              (r.cta_ySaldo || 0) +
              " | Fecha: " +
              (r.cbc_dfecha || "?"),
          );
        });
        if (rows.length > 10) info("  ... y " + (rows.length - 10) + " más");

        // Comprobantes con saldo pendiente
        var pendientes = rows.filter(function (r) {
          return (r.cta_ySaldo || 0) > 0;
        });
        if (pendientes.length > 0) {
          info(
            "  💰 " +
              pendientes.length +
              " comprobante(s) con saldo pendiente de cobro",
          );
        }
      }
      return rows;
    });
  }

  // ── Verificación de Cuenta Corriente ─────────────────────────────────

  function checkCuentaCorriente(clienteId) {
    section("Cuenta Corriente (cliente #" + clienteId + ")");
    return restSearch("CuentaCorriente", [
      { property: "cbc_iCliente", value: clienteId },
    ]).then(function (rows) {
      if (rows.length === 0) {
        info("  No hay movimientos en cuenta corriente para este cliente");
      } else {
        pass(rows.length + " movimiento(s) en cuenta corriente");
        var totalSaldo = 0;
        rows.forEach(function (r) {
          totalSaldo += r.cta_ySaldo || 0;
          info(
            "  " +
              (r._ncomprobante || "?") +
              " | " +
              (r.cbt_cdescripcion || "") +
              " | Total: $" +
              (r.cbc_yTotal || 0) +
              " | Saldo: $" +
              (r.cta_ySaldo || 0),
          );
        });
        info("  📊 Saldo total pendiente: $" + totalSaldo.toFixed(2));
      }
      return rows;
    });
  }

  // ── Verificación de modelos con writeAllFields ──────────────────────

  function checkWriteAllFields() {
    section("Verificación: writeAllFields en modelos cargados");

    var modelsChecked = 0;
    var modelsMissing = [];
    var modelsOk = [];

    // Recorrer todos los modelos registrados en el Manager de Ext
    Ext.data.schema.Schema.instances.forEach(function (schema) {
      var entities = schema.entityData || {};
      Object.keys(entities).forEach(function (entityName) {
        var entity = entities[entityName];
        if (!entity || !entity.cls) return;

        var proto = entity.cls.prototype;
        if (!proto || !proto.proxy) return;

        var proxyConfig = proto.proxy;
        // Solo revisar proxies REST que hacen escritura
        if (proxyConfig.type !== "rest") return;
        // Ignorar SearchModels (solo lectura)
        if (entityName.indexOf("SearchModel") !== -1) return;
        // Ignorar proxies de búsqueda
        if (proxyConfig.url && proxyConfig.url.indexOf("/search/") !== -1)
          return;

        modelsChecked++;

        var writer = proxyConfig.writer;
        if (!writer || writer.writeAllFields !== true) {
          modelsMissing.push(entityName + " (" + proxyConfig.url + ")");
        } else {
          modelsOk.push(entityName);
        }
      });
    });

    if (modelsChecked === 0) {
      info("No se encontraron modelos REST cargados para verificar");
      info(
        "(Los modelos se cargan bajo demanda, probar después de usar la app)",
      );
    } else {
      info(modelsChecked + " modelo(s) REST verificado(s)");
    }

    if (modelsOk.length > 0) {
      pass(modelsOk.length + " modelo(s) con writeAllFields: true ✓");
    }

    if (modelsMissing.length > 0) {
      fail(
        modelsMissing.length +
          " modelo(s) SIN writeAllFields (riesgo de corrupción):",
      );
      modelsMissing.forEach(function (m) {
        info("  ❌ " + m);
      });
    }

    return {
      checked: modelsChecked,
      ok: modelsOk.length,
      missing: modelsMissing,
    };
  }

  // ── Run All ──────────────────────────────────────────────────────────

  function runAll(includeWriteTest) {
    results = [];
    var startTime = new Date();

    console.clear();
    console.log(
      "%c🧾 BILLING FLOW TEST — SoftGuard WebMG",
      "color:white;background:#2563eb;padding:8px 16px;font-size:16px;border-radius:4px",
    );
    console.log("Inicio: " + startTime.toLocaleString());
    console.log("─".repeat(60));

    return checkConfig()
      .then(function () {
        results = []; // Reset para no duplicar
        return checkOrganizaciones();
      })
      .then(function () {
        return checkClientesContables();
      })
      .then(function () {
        return checkContratos();
      })
      .then(function () {
        return checkComprobantes();
      })
      .then(function () {
        if (includeWriteTest) {
          return checkWriteAllFields();
        }
      })
      .then(function () {
        var elapsed = ((new Date() - startTime) / 1000).toFixed(1);
        console.log("\n" + "─".repeat(60));
        console.log("Tiempo total: " + elapsed + "s");
        printSummary();
      })
      .catch(function (err) {
        fail("Error inesperado: " + err);
        console.error(err);
        printSummary();
      });
  }

  // ── Resumen ──────────────────────────────────────────────────────────

  function printSummary() {
    var passes = results.filter(function (r) {
      return r.type === "pass";
    }).length;
    var fails = results.filter(function (r) {
      return r.type === "fail";
    }).length;
    var warns = results.filter(function (r) {
      return r.type === "warn";
    }).length;

    console.log("\n" + "═".repeat(60));
    console.log(
      "%c RESUMEN: " +
        passes +
        " OK | " +
        fails +
        " ERRORES | " +
        warns +
        " ADVERTENCIAS ",
      fails > 0
        ? "color:white;background:red;padding:4px 8px;font-size:14px"
        : "color:white;background:green;padding:4px 8px;font-size:14px",
    );
    console.log("═".repeat(60));

    if (fails > 0) {
      console.log("\n%c Errores encontrados:", "color:red;font-weight:bold");
      results
        .filter(function (r) {
          return r.type === "fail";
        })
        .forEach(function (r) {
          console.log("  ❌ " + r.msg);
        });
    }

    if (warns > 0) {
      console.log("\n%c Advertencias:", "color:orange;font-weight:bold");
      results
        .filter(function (r) {
          return r.type === "warn";
        })
        .forEach(function (r) {
          console.log("  ⚠️ " + r.msg);
        });
    }
  }

  // ── Función para probar un cliente específico e2e ────────────────────

  /**
   * Prueba el flujo completo para un cliente contable específico.
   * Solo lectura: verifica que tiene org, contrato activo, comprobantes, etc.
   *
   * Uso: BillingTest.checkCliente(clienteId)
   */
  function checkCliente(clienteId) {
    results = [];
    section("TEST E2E PARA CLIENTE #" + clienteId);

    var clienteData = null;

    return restSearch("m_clientes_fc", [
      { property: "cli_icodigo_ID", value: clienteId },
    ])
      .then(function (rows) {
        if (rows.length === 0) {
          fail("Cliente #" + clienteId + " no encontrado");
          throw new Error("Cliente no encontrado");
        }
        clienteData = rows[0];
        pass("Cliente encontrado: " + clienteData.cli_cnombre);
        info("  Org: " + (clienteData.cli_iorganizacion || "FALTA"));
        info(
          "  Cat. Impositiva: " +
            (clienteData.cli_ccategoriaimpositiva || "FALTA"),
        );
        info("  Cond. Pago: " + (clienteData.cli_ccondicionpago || "FALTA"));

        if (!clienteData.cli_iorganizacion) {
          fail("Cliente sin organización facturadora asignada");
        }
        if (!clienteData.cli_ccategoriaimpositiva) {
          fail("Cliente sin categoría impositiva");
        }
        if (!clienteData.cli_ccondicionpago) {
          fail("Cliente sin condición de pago");
        }
        return clienteData;
      })
      .then(function () {
        // Buscar contratos de este cliente
        section("Contratos del cliente");
        return restSearch("crm_contrato", [
          { property: "cnt_idcliente", value: clienteId },
        ]);
      })
      .then(function (contratos) {
        if (contratos.length === 0) {
          warn("No hay contratos para este cliente");
        } else {
          var activos = contratos.filter(function (c) {
            return c.cnt_estado === 1;
          });
          pass(
            contratos.length + " contrato(s), " + activos.length + " activo(s)",
          );
          contratos.forEach(function (c) {
            var estados = {
              0: "Pendiente",
              1: "Activo",
              2: "Cancelado",
              3: "Vencido",
            };
            info(
              "  #" +
                c.Id +
                " | Estado: " +
                (estados[c.cnt_estado] || c.cnt_estado) +
                " | Vto: " +
                (c.cnt_fechavto || "SIN FECHA"),
            );
          });
        }
      })
      .then(function () {
        // Buscar comprobantes
        section("Comprobantes del cliente");
        return restSearch("m_comprobantes_cab_fc", [
          { property: "cbc_icliente", value: clienteId },
        ]);
      })
      .then(function (comprobantes) {
        if (comprobantes.length === 0) {
          info("  No hay comprobantes generados para este cliente");
        } else {
          pass(comprobantes.length + " comprobante(s)");
          comprobantes.forEach(function (c) {
            info(
              "  " +
                (c._ncomprobante || "?") +
                " | " +
                (c.cbt_cdescripcion || "") +
                " | Total: $" +
                c.cbc_ytotal +
                " | Saldo: $" +
                (c.cta_ySaldo || 0),
            );
          });
        }
      })
      .then(function () {
        // Cuenta corriente
        return checkCuentaCorriente(clienteId);
      })
      .then(function () {
        printSummary();
      })
      .catch(function (err) {
        fail("Error: " + err);
        printSummary();
      });
  }

  // ── API pública ──────────────────────────────────────────────────────

  return {
    runAll: runAll,
    checkConfig: checkConfig,
    checkOrg: function (orgId) {
      results = [];
      return checkFilters(orgId);
    },
    checkFilters: checkFilters,
    checkCliente: checkCliente,
    checkWriteAllFields: function () {
      results = [];
      section("VERIFICACIÓN writeAllFields");
      checkWriteAllFields();
      printSummary();
    },
  };
})();

// ── Auto-mensaje de bienvenida ──────────────────────────────────────
console.log(
  "%c BillingTest cargado correctamente ",
  "color:white;background:#059669;padding:4px 8px;font-size:12px;border-radius:4px",
);
console.log("Comandos disponibles:");
console.log(
  "  BillingTest.runAll()              → Verificación completa (solo lectura)",
);
console.log(
  "  BillingTest.runAll(true)          → Incluye check de writeAllFields",
);
console.log(
  "  BillingTest.checkConfig()         → Solo verificar configuración previa",
);
console.log(
  "  BillingTest.checkOrg(orgId)       → Verificar filtros de una org",
);
console.log(
  "  BillingTest.checkCliente(cliId)   → Verificar flujo e2e de un cliente",
);
console.log("  BillingTest.checkWriteAllFields() → Verificar modelos cargados");
