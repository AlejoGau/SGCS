Ext.define( 'Administrator.store.WPSecurityModulesStore', {
    extend: 'Ext.data.Store',
    model: 'Administrator' + '.model.ModuleModel',
    id: 'WPModuleStore',

    data: [
        /* CUENTAS - ParentId 0 */
        {
            text: 'Cuenta sin control de test configurado',
            iconCls: 'icon-book-error',
            view: 'reportecuentasincontrolconfiguracionview',
            leaf: true,
            closable: true,
            closeAction: 'destroy',
            folder: 'cuentas'
        }, {
            text: 'Sumario por Dealers',
            iconCls: 'icon-database-table',
            view: 'reportesumariodealersview',
            leaf: true,
            closable: true,
            closeAction: 'destroy',
            folder: 'cuentas'
        }, {
            text: 'Sumario por Organizaciones',
            iconCls: 'icon-database-table',
            view: 'reportesumariodealerpororgview',
            leaf: true,
            closable: true,
            closeAction: 'destroy',
            folder: 'cuentas'
        }, {
            text: 'Sumario por Tipo de Cuenta',
            iconCls: 'icon-database-table',
            view: 'reportesumariotipoview',
            leaf: true,
            closable: true,
            closeAction: 'destroy',
            folder: 'cuentas'
        }, {
            text: 'Cuentas en Fallo de Testeo',
            iconCls: 'icon-cancel',
            view: 'reportecuentafallotesteoview',
            leaf: true,
            closable: true,
            closeAction: 'destroy',
            folder: 'cuentas'
        }, {
            text: 'Cuentas en Falla de AC',
            iconCls: 'icon-lightning-delete',
            view: 'reportecuentafallotesteoacview',
            leaf: true,
            closable: true,
            closeAction: 'destroy',
            folder: 'cuentas'
        }, {
            text: 'Cuentas con Falta de Activación',
            iconCls: 'icon-lock-open',
            view: 'reportecuentafaltaactivacionview',
            leaf: true,
            closable: true,
            closeAction: 'destroy',
            folder: 'cuentas'
        }, {
            text: 'Informe cuenta',
            iconCls: 'icon-computer-edit',
            view: 'informecuentaview',
            leaf: true,
            closable: true,
            closeAction: 'destroy',
            folder: 'cuentas'
        }, {
            //text : 'Reporte Estado de la cuenta',
            text: 'Estado y Situación',
            iconCls: 'icon-reporte-estadocuentas',
            view: 'reporteestadocuentaview',
            leaf: true,
            closable: true,
            closeAction: 'destroy',
            folder: 'cuentas'
        }, {
            //text : 'Reporte Ultimo evento por cuenta',
            text: 'Ultimo evento por cuenta',
            iconCls: 'icon-user-go',
            view: 'reporteultimoeventocuentaview',
            leaf: true,
            closable: true,
            closeAction: 'destroy',
            folder: 'cuentas'
        }, {
            //text : 'Reporte Estados por cuenta MSTatus',
            text: 'Altas, Bajas y Cambio de Situación',
            iconCls: 'icon-account-menu',
            view: 'reporteestadocuentamstatusview',
            leaf: true,
            closable: true,
            closeAction: 'destroy',
            folder: 'cuentas'
        }, {
            text: 'Reporte Paneles de Alarma',
            iconCls: 'icon-panel',
            view: 'reportepanelalarmaview',
            leaf: true,
            closable: true,
            closeAction: 'destroy',
            folder: 'cuentas'
        }, {
            text: 'Oficina Provincial para la Gestión de Seguridad Privada',
            iconCls: 'icon-folder-page-white',
            view: 'reporteopgspview',
            leaf: true,
            closable: true,
            closeAction: 'destroy',
            folder: 'cuentas',
            profile: 0
        }, {
            text: 'Comandos Enviados',
            iconCls: 'icon-folder-page-white',
            view: 'reportecomandosenviadosview',
            leaf: true,
            closable: true,
            closeAction: 'destroy',
            folder: 'cuentas',
            profile: 0
        }
        /* EVENTOS */
        , {
            text: 'Estadística de Eventos',
            iconCls: 'icon-computer-edit',
            view: 'estadisitcaseventosview',
            leaf: true,
            closable: true,
            closeAction: 'destroy',
            folder: 'eventos'
        }, {
            text: 'Promedio Atencion',
            iconCls: 'icon-prioridad',
            view: 'reportepromedioAtencionEventobyprioridadview',
            leaf: true,
            closable: true,
            closeAction: 'destroy',
            folder: 'eventos'
        }, {
            text: 'Eventos por zona',
            iconCls: 'icon-report-add',
            view: 'eventosbycuentazonaview',
            leaf: true,
            closable: true,
            closeAction: 'destroy',
            folder: 'eventos'
        }, {
            text: 'Promedio eventos por minuto',
            iconCls: 'icon-reporte-operadortiempoyprioridad',
            view: 'reporteoperadortiempoyprioridadview',
            leaf: true,
            closable: true,
            closeAction: 'destroy',
            folder: 'eventos'
        }, {
            text: 'Eventos por día',
            iconCls: 'icon-eventos',
            view: 'reporteeventosaldiaview',
            leaf: true,
            closable: true,
            closeAction: 'destroy',
            folder: 'eventos'
        }, {
            text: 'Estadística por Categorización',
            iconCls: 'icon-reporte-estadisticacategorizacion',
            view: 'reportestadisticacategorizacionview',
            leaf: true,
            closable: true,
            closeAction: 'destroy',
            folder: 'eventos'
        }, {
            text: 'Reporte eventos por fecha',
            iconCls: 'icon-categ-eventos',
            view: 'reporteeventosbycuentaview',
            leaf: true,
            closable: true,
            closeAction: 'destroy',
            folder: 'eventos'
        }, {
            text: 'Flujo de señales por receptor',
            iconCls: 'icon-flujo-senales',
            view: 'reporteflujosenalesview',
            leaf: true,
            closable: true,
            closeAction: 'destroy',
            folder: 'eventos'
        }, {
            text: 'Flujo de señales por puerto',
            iconCls: 'icon-flujo-senales',
            view: 'reporteflujosenalespuertoview',
            leaf: true,
            closable: true,
            closeAction: 'destroy',
            folder: 'eventos'
        }
        , {
            text: 'Reporte históricos de eventos redireccionados',
            iconCls: 'icon-arrow-event-redirec',
            view: 'reporteeventosredireccionadosview',
            leaf: true,
            closable: true,
            closeAction: 'destroy',
            folder: 'eventos'
        }
        , {
            text: 'Reporte históricos de eventos - Cuentas no Hab.',
            iconCls: 'icon-reporte-historicoeventoscuenohab',
            view: 'reportehistoricoeventoscuentanohabview',
            leaf: true,
            closable: true,
            closeAction: 'destroy',
            folder: 'eventos'
        }

        // Nuevo BC 402017122 : Export especial de XLS nuevo.
        , {
            text: 'Exportador de Eventos',
            iconCls: 'icon-eventos',
            view: 'exportarreporteeventosview',
            leaf: true,
            closable: true,
            closeAction: 'destroy',
            folder: 'eventos'
        }, {
            text: 'SMS Enviados',
            iconCls: 'icon-database-table',
            view: 'reporteSMSEnviadosView',
            leaf: true,
            closable: true,
            closeAction: 'destroy',
            folder: 'eventos'
        },
        {
            text: 'Cantidad de Eventos por Día',
            iconCls: 'icon-reporte-historicoeventoscuenohab',
            view: 'cantidadeventospordiaview',
            leaf: true,
            closable: true,
            closeAction: 'destroy',
            folder: 'eventos'
        }
        , {
            text: 'Llamadas en Eventos',
            iconCls: 'icon-llamadas-eventos',
            view: 'reportellamadaseneventosview',
            leaf: true,
            closable: true,
            closeAction: 'destroy',
            folder: 'eventos'
        }


        /* OPERADORES */
        , {
            text: 'Eventos por operador',
            iconCls: 'icon-reporte-eventooperador',
            view: 'reporteeventosview',
            leaf: true,
            closable: true,
            closeAction: 'destroy',
            folder: 'operadores'
        }, {
            //text : 'Reporte de operador tiempo respuesta',
            text: 'Tiempo de respuesta',
            iconCls: 'icon-user-go',
            view: 'reporteoperadortiemporespuestaview',
            leaf: true,
            closable: true,
            closeAction: 'destroy',
            folder: 'operadores'
        }, {
            text: 'Tiempos eventos',
            iconCls: 'icon-eventos',
            view: 'reportetiemposeventosview',
            leaf: true,
            closable: true,
            closeAction: 'destroy',
            folder: 'operadores'
        }, {
            text: 'Eventos agrupado por Operador y Cod. Alarma',
            iconCls: 'icon-database-table',
            view: 'reporteeventosporoperadorview',
            leaf: true,
            closable: true,
            closeAction: 'destroy',
            folder: 'operadores'
        }

        /* SERVICIO TECNICO */
        , {
            text: 'Servicio Técnico',
            iconCls: 'SgSerTec-icon',
            view: 'reporteservtecview',
            leaf: true,
            closable: true,
            closeAction: 'destroy',
            folder: 'tecnico'
        }, {
            //text : 'Reporte cronograma por tecnico',
            text: 'Cronograma por tecnico',
            iconCls: 'icon-reporte-cronogramatecnico',
            view: 'reportecronogramatecnicoview',
            leaf: true,
            closable: true,
            closeAction: 'destroy',
            folder: 'tecnico'
        }, {
            //text : 'Reporte Pedidos por estado',
            text: ' Pedidos por estado',
            iconCls: 'icon-reporte-pedidoporestado',
            view: 'reporteservicioporestadoview',
            leaf: true,
            closable: true,
            closeAction: 'destroy',
            folder: 'tecnico'
        }, {
            //text : 'Reporte Estadisitica por servicio',
            text: 'Estadística por servicio',
            iconCls: 'icon-reporte-estadisticaservicio',
            view: 'reporteestadisticaporservicioview',
            leaf: true,
            closable: true,
            closeAction: 'destroy',
            folder: 'tecnico'
        }, {
            //text : 'Reporte Informe Stock mínimo',
            text: 'Stock mínimo por producto',
            iconCls: 'icon-categ-eventos',//'icon-reporte-stockminimo',
            view: 'reporteinformestockminimoview',
            leaf: true,
            closable: true,
            closeAction: 'destroy',
            folder: 'tecnico'
        }, {
            //text : 'Reporte Horas trabajadas por tarea',
            text: 'Horas trabajadas por tarea',
            iconCls: 'icon-reporte-horastrabajadastecnico',
            view: 'reportehorasportecnicoview',
            leaf: true,
            closable: true,
            closeAction: 'destroy',
            folder: 'tecnico'
        }, {
            //text : 'Reporte Informe de productos insumidos',
            text: 'Productos insumidos por técnico',
            iconCls: 'icon-reporte-informeproductosinsumos',
            view: 'reporteinformeproductoinsumosview',
            leaf: true,
            closable: true,
            closeAction: 'destroy',
            folder: 'tecnico'
        }, {
            //text : 'Reporte Informe movimiento stock',
            text: 'Movimientos de stock',
            iconCls: 'icon-categ-eventos',//'icon-reporte-informemovimientostock',
            view: 'reporteinformemovimientostockview',
            leaf: true,
            closable: true,
            closeAction: 'destroy',
            folder: 'tecnico'
        }


        /* VIGICONTROL */

        , {
            text: 'Cantidad de horas trabajadas por Vigilador',
            iconCls: 'icon-reporte-horasvigilador',
            view: 'reportehorasvigiladorview',
            leaf: true,
            closable: true,
            closeAction: 'destroy',
            folder: 'vigicontrol'
        }, {
            text: 'Cantidad de horas trabajadas por Vigilador Mensual',
            iconCls: 'icon-orange-clock',
            view: 'reportehorasvigiladormesview',
            leaf: true,
            closable: true,
            closeAction: 'destroy',
            folder: 'vigicontrol'
        }, {
            text: 'Cantidad de horas trabajadas por Objetivo',
            iconCls: 'icon-reporte-horasobjetivo',
            view: 'reportehorasporobjectivoview',
            leaf: true,
            closable: true,
            closeAction: 'destroy',
            folder: 'vigicontrol'
        }, {
            text: 'Cantidad de horas contratadas por Objetivo',
            iconCls: 'icon-reporte-horasobjetivo',
            view: 'reportehscontratadasobjectview',
            leaf: true,
            closable: true,
            closeAction: 'destroy',
            folder: 'vigicontrol'
        }, {
            text: 'Reporte de Recorridos',
            iconCls: 'icon-route',
            view: 'reporterondasview',
            leaf: true,
            closable: true,
            closeAction: 'destroy',
            folder: 'vigicontrol'
        }, {
            text: 'Historial de Asignaciones',
            iconCls: 'icon-panel',
            view: 'reportehistorialasignacionview',
            leaf: true,
            closable: true,
            closeAction: 'destroy',
            folder: 'vigicontrol'
        }, {
            text: 'Marcaciones por Checkpoint',
            iconCls: 'icon-rp-MarcCheckpoint',
            view: 'marcacionescheckpointview',
            leaf: true,
            closable: true,
            closeAction: 'destroy',
            folder: 'vigicontrol'
        }, {
            text: 'Marcaciones por dia',
            iconCls: 'icon-rp-marcDia',
            view: 'marcacionesdiaview',
            leaf: true,
            closable: true,
            closeAction: 'destroy',
            folder: 'vigicontrol'
        }, {
            text: 'Marcaciones por día de la semana y hora',
            iconCls: 'icon-rp-marcDia',
            view: 'reportemarcasemanahoraview',
            leaf: true,
            closable: true,
            closeAction: 'destroy',
            folder: 'vigicontrol'
        }

        /* CRM */
        , {
            text: 'Cotizaciones en CRM',
            iconCls: 'icon-money-dollar',
            view: 'reportecotizacionescrmview',
            leaf: true,
            closable: true,
            closeAction: 'destroy',
            folder: 'crm'
        }, {
            text: 'Cotizaciones Cerradas / Abiertas en CRM',
            iconCls: 'icon-reporte-cotizaciones-abiertascerradas',
            view: 'reportecotizacionestotalcrmview',
            leaf: true,
            closable: true,
            closeAction: 'destroy',
            folder: 'crm'
        }, {
            text: 'Cotizaciones Vencidas en CRM',
            iconCls: 'icon-reporte-cotizaciones-vencidascrm',
            view: 'reportecotizacionesvencidascrmview',
            leaf: true,
            closable: true,
            closeAction: 'destroy',
            folder: 'crm'
        },
        {
            text: 'Reporte de Organizaciones',
            iconCls: 'icon-reporte-org ',
            view: 'reporteorganizacionview',
            leaf: true,
            closable: true,
            closeAction: 'destroy',
            folder: 'crm'
        }

        /* SISTEMA */
        , {
            //text : 'Usuarios Desktop',
            text: 'Permisos por Usuario',
            iconCls: 'icon-user',
            view: 'reporteusuariosview',
            leaf: true,
            closable: true,
            closeAction: 'destroy',
            folder: 'sistema'
        }, {
            //text : 'Performance',
            text: 'Informe de rendimiento',
            iconCls: 'icon-reporte-performance',
            view: 'reporteperformaceview',
            leaf: true,
            closable: true,
            closeAction: 'destroy',
            folder: 'sistema'
        }, {
            //text : 'Reporte de accesos',
            text: 'Reporte de actividad',
            iconCls: 'icon-user-go',
            view: 'reporteloginlogoutview',
            leaf: true,
            closable: true,
            closeAction: 'destroy',
            folder: 'sistema'
        }

        /* SmartPanics */
        , {
            text: 'Actividad de dispositivos',
            iconCls: 'icon-phone',
            view: 'reporteactividadsmartpanicsview',
            leaf: true,
            closable: true,
            closeAction: 'destroy',
            folder: 'smartpanics'
        }, {
            text: 'Dispositivos',
            iconCls: 'icon-phone-sound',
            view: 'reportesmartpanicsdispositivosview',
            leaf: true,
            closable: true,
            closeAction: 'destroy',
            folder: 'smartpanics'
        }, {
            text: 'Detalle de Dispositivos',
            iconCls: 'icon-phone-sound',
            view: 'reportesmartpanicsdispositivosdetview',
            leaf: true,
            closable: true,
            closeAction: 'destroy',
            folder: 'smartpanics'
        }

        /* TrackGuard */
        , {
            text: 'Tiempo Detenido',
            iconCls: 'SgTrackGuard-icon',
            view: 'reportetgtiempodetenidoview',
            leaf: true,
            closable: true,
            closeAction: 'destroy',
            folder: 'trackguard'
        }, {
            text: 'Recorridos',
            iconCls: 'SgTrackGuard-icon',
            view: 'reportetgresumenrecorridosview',
            leaf: true,
            closable: true,
            closeAction: 'destroy',
            folder: 'trackguard'
        }, {
            text: 'Excesos de Velocidad',
            iconCls: 'SgTrackGuard-icon',
            view: 'reportetgexcesovelocidadview',
            leaf: true,
            closable: true,
            closeAction: 'destroy',
            folder: 'trackguard'
        },    {
            text: "Personal",
            iconCls: "SgTrackGuard-icon",
            view: "reportetgpersonalview",
            leaf: true,
            closable: true,
            closeAction: "destroy",
            folder: "trackguard",
            },

        /* CleanApp */
        // ,{
        //     text: 'Cantidad de horas trabajadas por Objetivo',
        //     iconCls: '',
        //     view: 'reportehorasporobjetivocleanappview',
        //     leaf: true, 
        //     closable: true,
        //     closeAction: 'destroy',
        //     folder : 'cleanapp'
        // }
        , {
            text: 'Cantidad de horas trabajadas por Personal de Limpieza',
            iconCls: 'icon-reporte-horasvigilador',
            view: 'reportehoraspersonallimpiezacleanappview',
            leaf: true,
            closable: true,
            closeAction: 'destroy',
            folder: 'cleanapp'
        }
        // ,{
        //     text: 'Historial de Asignaciones de tareas',
        //     iconCls: '',
        //     view: 'reportehistorialasignacionescleanappview',
        //     leaf: true, 
        //     closable: true,
        //     closeAction: 'destroy',
        //     folder : 'cleanapp'
        // }
        , {
            text: 'Reporte de Postas de limpieza',
            iconCls: 'icon-route',
            view: 'reportepostascleanappview',
            leaf: true,
            closable: true,
            closeAction: 'destroy',
            folder: 'cleanapp'
        }


        /* control acceso*/
        , {
            text: 'Histórico de eventos',
            iconCls: 'icon-database-table',
            view: 'reporteeventosbycuentaview',
            viewConfig: "{reportType:'historico_eventos'}",
            leaf: true,
            closable: true,
            closeAction: 'destroy',
            folder: 'controlaccesos'
        }
        , {
            text: 'Control de ingresos y egresos',
            iconCls: 'icon-categ-eventos',//'icon-reporte-informemovimientostock',
            view: 'reportecontrolioview',
            leaf: true,
            closable: true,
            closeAction: 'destroy',
            folder: 'controlaccesos'
        },




        //MoneyGuard
        /** {
            text : 'Reporte de Cobro',
            iconCls : 'icon-money-dollar',
            view: 'reportecobroview',
            leaf: true, 
            closable: true,
            closeAction: 'destroy',
            folder : 'moneyguard'
        },*/{
            text: 'Suscripciones Recurrentes',
            iconCls: 'icon-money-dollar',
            view: 'reportecontratosview',
            leaf: true,
            closable: true,
            closeAction: 'destroy',
            folder: 'moneyguard'
        }
        /* NO SE UTILIZAN O EN DESARROLLO.
        ,{
            text : 'Evento (cta. no habi.)',
            iconCls : 'icon-report-user',
            view: 'reporteeventosnhview',
    		leaf: true, 
            closable: true,
            closeAction: 'destroy'
		},{
            text : 'Auditoria',
            iconCls : 'icon-database-table',
            view: 'reporteauditoriaview',
            leaf: true, 
            closable: true,
            closeAction: 'destroy'
		},{
            text : 'Reporte Sms',
            iconCls : 'icon-database-table',
            view: 'reportesmsview',
        	leaf: true, 
            closable: true,
            closeAction: 'destroy'
		},{
            text : 'Orden de servicio tecnico',
            iconCls : 'icon-report',
            view: 'ordenservtecview',
            leaf: true, 
            closable: true,
            closeAction: 'destroy'
		}*/

    ]
});