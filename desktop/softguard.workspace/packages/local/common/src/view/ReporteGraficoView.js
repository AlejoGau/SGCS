//MIGRADO2024
function colRenderer( value, metadata, record, rowIndex, colIndex, store, view ) {
    var hora = colIndex - 1;
    var cero = hora < 10 ? '0' : '';
    var horastr = cero + hora.toString();
	var data = record.get( horastr );
    var more = '';
    if( data ) {
        metadata.tdCls = data.cls;
        metadata.tdAttr = 'data-qtip="' + Ext.String.htmlEncode( data.qtip ) + '"';
        if( data.eventos && data.eventos.length > 0 ) {
			console.log("hora",hora)
			console.log("cero",cero)
			console.log("horastr",horastr)
			console.log( "data", data )
			console.log( "record", record )
            metadata.style = 'cursor: hand';
            return '<img src="/resources/global/images/icons/database.png"/>';
        } else {
            return '';
        }
    }
    return ''
}
Ext.define( 'Common.view.ReporteGraficoView', {
    extend: 'Ext.grid.Panel',
	alias: 'widget.reportegraficoview',
	title: 'Reporte gráfico',
    viewConfig: {
        markDirty: false
    },
    listeners: {
        cellclick: function( gridView, htmlElement, columnIndex, dataRecord ) {
            //console.log(htmlElement,columnIndex,dataRecord);
            var controller = this;
            var hora = columnIndex - 1;
            var cero = hora < 10 ? '0' : '';
            var horastr = cero + hora.toString();
            var data = dataRecord.get( horastr );
            var more = '';
            if( data ) {
                if( data.eventos && data.eventos.length > 0 ) {
                    var fechadesde = Ext.Date.add( data.options.fechaDesde, Ext.Date.HOUR, parseInt( horastr ) );
                    var fechahasta = Ext.Date.add( fechadesde, Ext.Date.HOUR, 1 )
                    var options = {
                        fechaDesde: fechadesde,
                        fechaHasta: fechahasta
                    }
                    if( data.eventos && data.eventos.length > 0 ) {
                        var view = Ext.widget( 'recepcionview', {
                            /*caller: view,
                            record: myobject,
                            objectId : id,*/
							options: options,
                            record: controller.record
                        });
						var win = Ext.create( 'Ext.Window', {
							iconCls: 'icon-table-add',
							layout: 'fit',
							title: 'Recepcion',
							width: 800,
							height: 400,
							border: false,
							items: view
						});
						win.show();
					}
				}
			}
		}
    },
    columnLines: true,
    columns: {
        defaults: {
            translate: false
        },
        items: [ {
			text: getLocale( 'Fecha / Hora' ),
			dataIndex: 'fecha',
			xtype: 'datecolumn',
			format: 'D d-m-Y',
			width: 120
		}, {
				xtype: 'gridcolumn',
				header: '00',
				sortable: false,
				dataIndex: '00',
				renderer: colRenderer,
				width: 30,
				menuDisabled: true
			}, {
				xtype: 'gridcolumn',
				header: '01',
				sortable: false,
				dataIndex: '01',
				renderer: colRenderer,
				width: 30,
				menuDisabled: true
			}, {
				xtype: 'gridcolumn',
				header: '02',
				sortable: false,
				dataIndex: '02',
				renderer: colRenderer,
				width: 30,
				menuDisabled: true
			}, {
				xtype: 'gridcolumn',
				header: '03',
				sortable: false,
				dataIndex: '03',
				renderer: colRenderer,
				width: 30,
				menuDisabled: true
			}, {
				xtype: 'gridcolumn',
				header: '04',
				sortable: false,
				dataIndex: '04',
				renderer: colRenderer,
				width: 30,
				menuDisabled: true
			}, {
				xtype: 'gridcolumn',
				header: '05',
				sortable: false,
				dataIndex: '05',
				renderer: colRenderer,
				width: 30,
				menuDisabled: true
			}, {
				xtype: 'gridcolumn',
				header: '06',
				sortable: false,
				dataIndex: '06',
				renderer: colRenderer,
				width: 30,
				menuDisabled: true
			}, {
				xtype: 'gridcolumn',
				header: '07',
				sortable: false,
				renderer: colRenderer,
				dataIndex: '07',
				width: 30,
				menuDisabled: true
			}, {
				xtype: 'gridcolumn',
				header: '08',
				sortable: false,
				renderer: colRenderer,
				dataIndex: '08',
				width: 30,
				menuDisabled: true
			}, {
				xtype: 'gridcolumn',
				header: '09',
				sortable: false,
				renderer: colRenderer,
				dataIndex: '09',
				width: 30,
				menuDisabled: true
			}, {
				xtype: 'gridcolumn',
				header: '10',
				sortable: false,
				dataIndex: '10',
				renderer: colRenderer,
				width: 30,
				menuDisabled: true
			}, {
				xtype: 'gridcolumn',
				header: '11',
				sortable: false,
				renderer: colRenderer,
				dataIndex: '11',
				width: 30,
				menuDisabled: true
			}, {
				xtype: 'gridcolumn',
				header: '12',
				sortable: false,
				renderer: colRenderer,
				dataIndex: '12',
				width: 25,
				menuDisabled: true
			}, {
				xtype: 'gridcolumn',
				header: '13',
				sortable: false,
				renderer: colRenderer,
				dataIndex: '13',
				width: 30,
				menuDisabled: true
			}, {
				xtype: 'gridcolumn',
				header: '14',
				renderer: colRenderer,
				sortable: false,
				dataIndex: '14',
				width: 30,
				menuDisabled: true
			}, {
				xtype: 'gridcolumn',
				header: '15',
				sortable: false,
				dataIndex: '15',
				renderer: colRenderer,
				width: 30,
				menuDisabled: true
			}, {
				xtype: 'gridcolumn',
				header: '16',
				sortable: false,
				renderer: colRenderer,
				dataIndex: '16',
				width: 30,
				menuDisabled: true
			}, {
				xtype: 'gridcolumn',
				header: '17',
				sortable: false,
				renderer: colRenderer,
				dataIndex: '17',
				width: 30,
				menuDisabled: true
			}, {
				xtype: 'gridcolumn',
				header: '18',
				sortable: false,
				renderer: colRenderer,
				dataIndex: '18',
				width: 30,
				menuDisabled: true
			}, {
				xtype: 'gridcolumn',
				header: '19',
				sortable: false,
				renderer: colRenderer,
				dataIndex: '19',
				width: 30,
				menuDisabled: true
			}, {
				xtype: 'gridcolumn',
				header: '20',
				sortable: false,
				renderer: colRenderer,
				dataIndex: '20',
				width: 30,
				menuDisabled: true
			}, {
				xtype: 'gridcolumn',
				header: '21',
				sortable: false,
				dataIndex: '21',
				renderer: colRenderer,
				width: 30,
				menuDisabled: true
			}, {
				xtype: 'gridcolumn',
				header: '22',
				sortable: false,
				dataIndex: '22',
				renderer: colRenderer,
				width: 30,
				menuDisabled: true
			}, {
				xtype: 'gridcolumn',
				header: '23',
				sortable: false,
				renderer: colRenderer,
				dataIndex: '23',
				width: 30,
				menuDisabled: true
			}
		]
    },
    initComponent: function() {
        this.decimalColorToHTMLcolor = function( number ) {
            var intnumber = number - 0;
			var red, green, blue;
			var template = "#000000";
			red = ( intnumber & 0x0000ff ) << 16;
			green = intnumber & 0x00ff00;
			blue = ( intnumber & 0xff0000 ) >>> 16;
			intnumber = red | green | blue;
			var HTMLcolor = intnumber.toString( 16 );
			HTMLcolor = template.substring( 0, 7 - HTMLcolor.length ) + HTMLcolor;
			return HTMLcolor;
		};
        this.options = {
            fechaHasta: '',
			fechaDesde: '',
			alertas: '',
			tipos: '',
			mostrar: 0,
			orden: 'ASC',
            Id: 0
        };
        this.callParent();
        var toolbar = Ext.create( 'Ext.toolbar.Toolbar', {
            items: [
                {
                    text: 'Imprimir',
                    iconCls: 'icon-printer',
                    itemId: 'imprimir'
                }, "-", {
                    xtype: 'combo',
                    itemId: 'treporte',
                    fieldLabel: 'Filtro',
                    name: 'cService',
                    value: '0',
                    store: [
                        [ '0', getLocale( '7 Días' ) ],
                        [ '1', getLocale( '15 Días' ) ],
                        [ '2', getLocale( 'Mes en curso' ) ],
                        [ '3', getLocale( 'Entre fechas' ) ]
                    ],
                    queryMode: 'local',
                    labelWidth: 30
                }, '-', {
					xtype: 'combo',
					fieldLabel: 'Tabla Historico',
					displayField: '_periodo',
					queryMode: 'local',
					valueField: 'c_periodo',
					itemId: 'combohistorico',
					plugins: [ 'clearbutton' ],
					width: 250,
					labelAlign: 'rigth',
                    labelWidth: 100
				},
				{
					xtype: 'datefield',
					fieldLabel: 'Desde',
					name: "fdesde",
					bindToModel: false,
					itemId: 'fechadesde',
					labelAlign: 'rigth',
					width: 140,
                    labelWidth: 40
				}, {
					xtype: 'datefield',
					fieldLabel: 'Hasta',
					itemId: 'fechahasta',
                    maxValue: new Date(),
					labelAlign: 'rigth',
					bindToModel: false,
					name: "fhasta",
					width: 140,
                    labelWidth: 40
				}, {
					xtype: 'button',
					text: 'Buscar',
					action: 'search'
				}
            ]
        });
        this.addDocked( toolbar );
    },
    setCuentaId: function( id ) {
        this.options.Id = id;
    }
});