//MIGRADO2024
Ext.define('Common.view.AspectoVictimariosView', {
    extend:'Ext.form.Panel',
    alias : 'widget.aspectovictimarioview',
    //autoScroll: true,
    layout: 'vbox',
    style: 'margin: 0 0 0 7px;',
    items: [
        {
            xtype: 'container',
            layout: 'hbox',
            title: 'DeescripcionGral',
            margin:'0 0 5 0',
            items:[
                {
                    xtype: 'numberfield',
                    fieldLabel: 'Edad Aproximada (Años)',
    	            name:'cue_nAutoMonitoreo',
                    itemId: 'AspectoEdad',
                    displayField : 'Name',
                    width: 230,
                    labelWidth: 180,
                    minValue: 0,
                    maxValue: 110,
                },
                {
                    xtype: 'numberfield',
                    fieldLabel: 'Peso Aproximado (KG)',
    	            name:'cue_nAutoMonitoreo',
                    itemId: 'AspectoPeso',
                    displayField : 'Name',
                    width: 230,
                    labelWidth: 180,
                    style: 'margin: 0 0 0 7px;',
                    minValue: 0,
                    maxValue: 180,
                },{
                    xtype: 'numberfield',
                    fieldLabel: 'Altura Aproximada (CM)',
    	            name:'cue_nAutoMonitoreo',
                    itemId: 'AspectoAltura',
                    displayField : 'Name',
                    width: 230,
                    labelWidth: 180,
                    style: 'margin: 0 0 0 7px;',
                    minValue: 0,
                    maxValue: 230,
                }
            ]
        },{
            xtype: 'panel',
            collapsible: true,
            title: 'Aspecto',
            layout: 'hbox',
            width: 800,
            height: 60,
            style: 'margin: 5px 0 0 0;',
            items: [
                {
                    xtype: 'combo',
                    margin: 5,
                    fieldLabel: 'Raza',
                    itemId: 'AspectoRaza',
                    store:[
                        [0, getLocale('No especifica')],
                        [1, getLocale('Caucasico')],
                        [2, getLocale('Oriental')],
                        [3, getLocale('Otra')]
                    ],
                    name:'cue_nPrioridad',
                    width: 200,
                    labelWidth: 75,
                    editable: false
                },
                {
                    xtype: 'combo',
                    fieldLabel: 'Tez',
                    margin: 5,
                    itemId: 'AspectosTez',
                    store:[
                        [0, getLocale('No especifica')],
                        [1, getLocale('Morena')],
                        [2, getLocale('Palida')],
                        [3, getLocale('Otra')]
                    ],
                    name:'cue_nPrioridad',
                    width: 200,
                    labelWidth: 75,
                    editable: false
                },
                {
                    xtype: 'combo',
                    fieldLabel: 'Contextura',
                    margin: 5,
                    itemId: 'AspectosContextura',
                    store:[
                        [0, getLocale('No especifica')],
                        [1, getLocale('Robusto')],
                        [2, getLocale('Flaco')],
                        [3, getLocale('Obeso')],
                        [4, getLocale('Otra')],
                    ],
                    name:'cue_nPrioridad',
                    width: 200,
                    labelWidth: 75,
                    editable: false
                }
            ]
        },{
            xtype: 'panel',
            collapsible: true,
            title: 'Cabello',
            layout: 'hbox',
            width: 800,
            height: 60,
            style: 'margin: 5px 0 0 0;',
            items: [
                {
                    xtype: 'combo',
                    margin: 5,
                    fieldLabel: 'Tipo',
                    itemId: 'AspectoTipoPelo',
                    store:[
                        [0, getLocale('No especifica')],
                        [1, getLocale('Crespo')],
                        [2, getLocale('lacio')],
                        [3, getLocale('No tiene')]
                    ],
                    name:'cue_nPrioridad',
                    width: 200,
                    labelWidth: 75,
                    editable: false
                },
                {
                    xtype: 'combo',
                    fieldLabel: 'Color',
                    margin: 5,
                    itemId: 'AspectosColorPelo',
                    store:[
                        [0, getLocale('No especifica')],
                        [1, getLocale('Rubio')],
                        [2, getLocale('Negro')],
                        [3, getLocale('Castaño Claro')],
                        [4, getLocale('Castaño Oscuro')]
                    ],
                    name:'cue_nPrioridad',
                    width: 200,
                    labelWidth: 75,
                    editable: false
                },
                {
                    xtype: 'combo',
                    fieldLabel: 'Estilo',
                    margin: 5,
                    itemId: 'AspectosEstiloPelo',
                    store:[
                        [0, getLocale('No especifica')],
                        [1, getLocale('Corto')],
                        [2, getLocale('Largo')],
                        [3, getLocale('Rapado')]
                    ],
                    name:'cue_nPrioridad',
                    width: 200,
                    labelWidth: 75,
                    editable: false
                }
            ]
        },{
            xtype: 'panel',
            collapsible: true,
            title: 'Rostro',
            layout: 'hbox',
            width: 800,
            height: 60,
            style: 'margin: 5px 0 0 0;',
            items: [
                {
                    xtype: 'combo',
                    margin: 5,
                    fieldLabel: 'Forma',
                    itemId: 'AspectoFormaRostro',
                    store:[
                        [0, getLocale('No especifica')],
                        [1, getLocale('Eliptica')],
                        [2, getLocale('Oval')],
                        [3, getLocale('Oval Invertida')]
                    ],
                    name:'cue_nPrioridad',
                    width: 200,
                    labelWidth: 75,
                    editable: false
                }
            ]
        },{
            xtype: 'panel',
            collapsible: true,
            title: 'Ojos',
            layout: 'hbox',
            width: 800,
            height: 60,
            style: 'margin: 5px 0 0 0;',
            items: [
                {
                    xtype: 'combo',
                    margin: 5,
                    fieldLabel: 'Forma',
                    itemId: 'AspectoFormaOjos',
                    store:[
                        [0, getLocale('No especifica')],
                        [1, getLocale('Rasgados')],
                        [2, getLocale('Saltones')]
                    ],
                    name:'cue_nPrioridad',
                    width: 200,
                    labelWidth: 75,
                    editable: false
                },
                {
                    xtype: 'combo',
                    fieldLabel: 'Color',
                    margin: 5,
                    itemId: 'AspectosColorOjos',
                    store:[
                        [0, getLocale('No especifica')],
                        [1, getLocale('Marron')],
                        [2, getLocale('Verde')],
                        [3, getLocale('Celeste')],
                        [4, getLocale('Negro')],
                        [5, getLocale('Azul')]
                    ],
                    name:'cue_nPrioridad',
                    width: 200,
                    labelWidth: 75,
                    editable: false
                }
            ]
        },{
            xtype: 'panel',
            collapsible: true,
            title: 'Nariz',
            layout: 'hbox',
            width: 800,
            height: 60,
            style: 'margin: 5px 0 0 0;',
            items: [
                {
                    xtype: 'combo',
                    margin: 5,
                    fieldLabel: 'Frente',
                    itemId: 'AspectofrenteNariz',
                    store:[
                        [0, getLocale('No especifica')],
                        [1, getLocale('Ancho')],
                        [2, getLocale('Fino')]
                    ],
                    name:'cue_nPrioridad',
                    width: 200,
                    labelWidth: 75,
                    editable: false
                },
                {
                    xtype: 'combo',
                    fieldLabel: 'Perfil',
                    margin: 5,
                    itemId: 'AspectosPerfilNariz',
                    store:[
                        [0, getLocale('No especifica')],
                        [1, getLocale('Recto')],
                        [2, getLocale('Convexo')]
                    ],
                    name:'cue_nPrioridad',
                    width: 200,
                    labelWidth: 75,
                    editable: false
                },
                {
                    xtype: 'combo',
                    fieldLabel: 'Tamaño',
                    margin: 5,
                    itemId: 'AspectosTamanoNariz',
                    store:[
                        [0, getLocale('No especifica')],
                        [1, getLocale('Grande')],
                        [2, getLocale('Mediano')],
                        [3, getLocale('chico')]
                    ],
                    name:'cue_nPrioridad',
                    width: 200,
                    labelWidth: 75,
                    editable: false
                }
            ]
        },{
            xtype: 'panel',
            collapsible: true,
            title: 'Boca',
            layout: 'hbox',
            width: 800,
            height: 60,
            style: 'margin: 5px 0 0 0;',
            items: [
                {
                    xtype: 'combo',
                    margin: 5,
                    fieldLabel: 'Labios',
                    itemId: 'AspectoLabiosBoca',
                    store:[
                        [0, getLocale('No especifica')],
                        [1, getLocale('Finos')],
                        [2, getLocale('Medianos')],
                        [3, getLocale('Gruesos')]
                    ],
                    name:'cue_nPrioridad',
                    width: 200,
                    labelWidth: 75,
                    editable: false
                },
                {
                    xtype: 'combo',
                    fieldLabel: 'Tamaño',
                    margin: 5,
                    itemId: 'AspectosTamanoBoca',
                    store:[
                        [0, getLocale('No especifica')],
                        [1, getLocale('Grande')],
                        [2, getLocale('Mediano')],
                        [3, getLocale('Chico')]
                    ],
                    name:'cue_nPrioridad',
                    width: 200,
                    labelWidth: 75,
                    editable: false
                }
            ]
        },{
            xtype: 'panel',
            collapsible: true,
            title: 'Menton',
            layout: 'hbox',
            width: 800,
            height: 60,
            style: 'margin: 5px 0 0 0;',
            items: [
                {
                    xtype: 'combo',
                    margin: 5,
                    fieldLabel: 'Forma',
                    itemId: 'AspectoFormaMenton',
                    store:[
                        [0, getLocale('No especifica')],
                        [1, getLocale('Prominente')],
                        [2, getLocale('Redondeado')],
                        [3, getLocale('En punta')]
                    ],
                    name:'cue_nPrioridad',
                    width: 200,
                    labelWidth: 75,
                    editable: false
                }
            ]
        },{
            xtype: 'panel',
            collapsible: true,
            title: 'Oreja',
            layout: 'hbox',
            width: 800,
            height: 60,
            style: 'margin: 5px 0 0 0;',
            items: [
                {
                    xtype: 'combo',
                    margin: 5,
                    fieldLabel: 'Forma',
                    itemId: 'AspectoFormaOreja',
                    store:[
                        [0, getLocale('No especifica')],
                        [1, getLocale('Redonda')],
                        [2, getLocale('Puntiaguda')],
                        [3, getLocale('Abierta')]
                    ],
                    name:'cue_nPrioridad',
                    width: 200,
                    labelWidth: 75,
                    editable: false
                },
                {
                    xtype: 'combo',
                    fieldLabel: 'Tamaño',
                    margin: 5,
                    itemId: 'AspectosTamanoOreja',
                    store:[
                        [0, getLocale('No especifica')],
                        [1, getLocale('Grande')],
                        [2, getLocale('Mediano')],
                        [3, getLocale('Chico')]
                    ],
                    name:'cue_nPrioridad',
                    width: 200,
                    labelWidth: 75,
                    editable: false
                }
            ]
        },{
            xtype: 'panel',
            collapsible: true,
            title: 'Cejas',
            layout: 'hbox',
            width: 800,
            height: 60,
            style: 'margin: 5px 0 0 0;',
            items: [
                {
                    xtype: 'combo',
                    margin: 5,
                    fieldLabel: 'Forma',
                    itemId: 'AspectoFormaCeja',
                    store:[
                        [0, getLocale('No especifica')],
                        [1, getLocale('Finas')],
                        [2, getLocale('Gruesas')],
                        [3, getLocale('Tupidas')]
                    ],
                    name:'cue_nPrioridad',
                    width: 200,
                    labelWidth: 75,
                    editable: false
                },
                {
                    xtype: 'combo',
                    fieldLabel: 'Tamaño',
                    margin: 5,
                    itemId: 'AspectosTamanoCejas',
                    store:[
                        [0, getLocale('No especifica')],
                        [1, getLocale('Grande')],
                        [2, getLocale('Mediano')],
                        [3, getLocale('Chico')]
                    ],
                    name:'cue_nPrioridad',
                    width: 200,
                    labelWidth: 75,
                    editable: false
                }
            ]
        },{
            xtype: 'panel',
            collapsible: true,
            title: 'Pilosidad facial',
            layout: 'hbox',
            width: 800,
            height: 60,
            style: 'margin: 5px 0 0 0;',
            items: [
                {
                    xtype: 'combo',
                    margin: 5,
                    fieldLabel: 'Tipo',
                    itemId: 'AspectoPilosidadTipo',
                    store:[
                        [0, getLocale('No especifica')],
                        [1, getLocale('No tiene')],
                        [2, getLocale('Barba')],
                        [3, getLocale('bigote')],
                        [4, getLocale('Patillas')]
                    ],
                    name:'cue_nPrioridad',
                    width: 200,
                    labelWidth: 75,
                    editable: false
                },
                {
                    xtype: 'combo',
                    fieldLabel: 'Forma',
                    margin: 5,
                    itemId: 'AspectosFormaPilosidad',
                    store:[
                        [0, getLocale('No especifica')],
                        [1, getLocale('Fina')],
                        [2, getLocale('Candado')],
                        [3, getLocale('Mostacho')]
                    ],
                    name:'cue_nPrioridad',
                    width: 200,
                    labelWidth: 75,
                    editable: false
                }
            ]
        }
    ]
           
});