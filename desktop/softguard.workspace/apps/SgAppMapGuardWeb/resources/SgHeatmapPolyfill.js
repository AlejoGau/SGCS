/* ============================================================================
 * DSS-1537 — Polyfill de google.maps.visualization.HeatmapLayer
 * ----------------------------------------------------------------------------
 * Google DECOMISIONO google.maps.visualization.HeatmapLayer en mayo 2026
 * (deprecado 27/05/2025, turn-down mayo 2026). La clase ya no existe, por lo
 * que `new google.maps.visualization.HeatmapLayer(...)` tira error y rompe el
 * HeatMap de MapGuard (HeatMapController.onHeatMapClick / onRemoveFilter).
 *
 * Mismo enfoque que DSS-1532 (DrawingManager): se POLYFILLEA la clase faltante
 * con una implementacion propia sobre canvas (google.maps.OverlayView), de modo
 * que los controllers NO se tocan. La firma usada por MapGuard queda intacta:
 *
 *     var hm = new google.maps.visualization.HeatmapLayer({
 *                  data: [ { location: new google.maps.LatLng(lat,lng), weight: n }, ... ],
 *                  radius: 25
 *              });
 *     hm.setMap(map);   // dibuja
 *     hm.setMap(null);  // oculta
 *
 * El renderer es el algoritmo de "simpleheat" (Vladimir Agafonkin, BSD-2)
 * vendorizado inline: no requiere CDN ni librerias externas (a diferencia de
 * Terra Draw en DSS-1532). google.maps.Circle / LatLng / OverlayView siguen
 * vivos, solo se removio HeatmapLayer.
 *
 * IMPORTANTE: este archivo se carga via el array "js" del app.json (como
 * MarkerClusterer.js) para garantizar que Sencha lo incluya VERBATIM en el build.
 * Antes vivia como IIFE suelto dentro de GMapPanel6.js y el build NO lo incluia,
 * por lo que installSgHeatmapPolyfill quedaba undefined y el polyfill no se instalaba.
 * Se instala en apiReady() de GMapPanel6 via installSgHeatmapPolyfill() (cuando google.maps cargo).
 * ==========================================================================*/
(function () {
    'use strict';

    // Gradiente por defecto similar al de Google (cyan -> azul -> lila -> rojo).
    var DEFAULT_GRADIENT = {
        0.20: 'rgba(0, 255, 255, 1)',
        0.40: 'rgba(0, 127, 255, 1)',
        0.55: 'rgba(0, 0, 255, 1)',
        0.70: 'rgba(63, 0, 91, 1)',
        0.85: 'rgba(191, 0, 31, 1)',
        1.00: 'rgba(255, 0, 0, 1)'
    };

    // ---- simpleheat (vendorizado, minimo) ----------------------------------
    function SimpleHeat(canvas) {
        this._canvas = canvas;
        // willReadFrequently: cada draw hace getImageData (readback); evita el warning
        // de performance de Canvas2D y acelera el colorize.
        this._ctx = canvas.getContext('2d', { willReadFrequently: true });
        this._data = [];
        this._max = 1;
        this._r = 25;
        this._circle = null;
        this._grad = null;
    }
    SimpleHeat.prototype.data = function (data) { this._data = data; return this; };
    SimpleHeat.prototype.max = function (max) { this._max = max; return this; };
    SimpleHeat.prototype.radius = function (r, blur) {
        blur = (blur == null) ? 15 : blur;
        var circle = this._circle = document.createElement('canvas'),
            ctx = circle.getContext('2d'),
            r2 = this._r = r + blur;
        circle.width = circle.height = r2 * 2;
        ctx.shadowOffsetX = ctx.shadowOffsetY = r2 * 2;
        ctx.shadowBlur = blur;
        ctx.shadowColor = 'black';
        ctx.beginPath();
        ctx.arc(-r2, -r2, r, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();
        return this;
    };
    SimpleHeat.prototype.gradient = function (grad) {
        var canvas = document.createElement('canvas'),
            ctx = canvas.getContext('2d'),
            gradient = ctx.createLinearGradient(0, 0, 0, 256);
        canvas.width = 1;
        canvas.height = 256;
        for (var i in grad) { gradient.addColorStop(+i, grad[i]); }
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 1, 256);
        this._grad = ctx.getImageData(0, 0, 1, 256).data;
        return this;
    };
    SimpleHeat.prototype.draw = function (minOpacity) {
        if (!this._circle) { this.radius(this._r); }
        if (!this._grad) { this.gradient(DEFAULT_GRADIENT); }
        var ctx = this._ctx;
        ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
        for (var i = 0, len = this._data.length, p; i < len; i++) {
            p = this._data[i];
            ctx.globalAlpha = Math.min(Math.max(p[2] / this._max, (minOpacity == null ? 0.05 : minOpacity)), 1);
            ctx.drawImage(this._circle, p[0] - this._r, p[1] - this._r);
        }
        var colored = ctx.getImageData(0, 0, this._canvas.width, this._canvas.height);
        this._colorize(colored.data, this._grad);
        ctx.putImageData(colored, 0, 0);
        return this;
    };
    SimpleHeat.prototype._colorize = function (pixels, grad) {
        for (var i = 0, len = pixels.length, j; i < len; i += 4) {
            j = pixels[i + 3] * 4; // alpha acumulado -> indice de gradiente
            if (j) {
                pixels[i] = grad[j];
                pixels[i + 1] = grad[j + 1];
                pixels[i + 2] = grad[j + 2];
            }
        }
    };

    // ---- Instalacion del polyfill ------------------------------------------
    function installSgHeatmapPolyfill() {
        if (typeof window === 'undefined' || !window.google || !google.maps) { return; }
        google.maps.visualization = google.maps.visualization || {};

        // NOTA: NO parcheamos google.maps.LatLng globalmente: sobreescribir esa clase
        // rompe la matematica interna de tiles/proyeccion del mapa (queda GRIS). La
        // coercion de coords string se hace local en HeatMapController (Number(...)) y,
        // por las dudas, defensivamente al cargar los puntos (ver _setDataInternal).

        // Google DECOMISIONO HeatmapLayer (mayo 2026) dejando un getter que TIRA
        // excepcion al leerlo. Por eso el chequeo de idempotencia va en try/catch:
        // si ya esta el nuestro salimos; si tira (getter de Google) seguimos y lo pisamos.
        try {
            if (google.maps.visualization.HeatmapLayer &&
                google.maps.visualization.HeatmapLayer.__sgPolyfill) { return; }
        } catch (e) { /* getter venenoso de Google: hay que sobreescribirlo igual */ }

        // OverlayView es una CLASE ES6. Hay que extenderla con class/super Y definir
        // TODOS los metodos (sobre todo onAdd/draw/onRemove) DENTRO del cuerpo de la
        // clase. Si se cuelgan del prototype DESPUES (SgHeatmapLayer.prototype.onAdd=..)
        // la API nueva de Maps NO los invoca y el overlay nunca pinta (confirmado en
        // MapGuard: una OverlayView con metodos en el cuerpo dispara onAdd/draw; la
        // misma con metodos colgados del prototype, no).
        var SgHeatmapLayer = class extends google.maps.OverlayView {
            constructor(opts) {
                super();
                opts = opts || {};
                this._points = [];                                 // [{ latLng, w }]
                this._radius = opts.radius || 20;
                this._blur = (opts.blur == null) ? 15 : opts.blur;
                this._minOpacity = (opts.minOpacity == null) ? 0.05 : opts.minOpacity;
                this._maxIntensity = opts.maxIntensity || null;    // si null -> autoescala
                this._gradient = opts.gradient || null;
                this._canvas = null;
                this._heat = null;
                if (opts.data) { this._setDataInternal(opts.data); }
            }

            _setDataInternal(data) {
                var pts = [];
                // Acepta MVCArray o Array de {location, weight} o de LatLng.
                var arr = (data && typeof data.getArray === 'function') ? data.getArray() : data;
                if (arr) {
                    for (var i = 0; i < arr.length; i++) {
                        var it = arr[i];
                        var loc = (it && it.location) ? it.location : it;
                        if (!loc) { continue; }
                        // Coercion defensiva: rearmo un LatLng limpio desde numeros.
                        // Si quedaron NaN (coords string sin coercer), descarto el punto
                        // en vez de romper el dibujo.
                        var la = (typeof loc.lat === 'function') ? Number(loc.lat()) : Number(loc.lat);
                        var lo = (typeof loc.lng === 'function') ? Number(loc.lng()) : Number(loc.lng);
                        if (isNaN(la) || isNaN(lo)) { continue; }
                        var w = (it && it.weight != null) ? it.weight : 1;
                        pts.push({ latLng: new google.maps.LatLng(la, lo), w: w });
                    }
                }
                this._points = pts;
            }

            // --- API publica compatible con google.maps.visualization.HeatmapLayer ---
            setData(data) { this._setDataInternal(data); this._redraw(); }
            getData() { return this._points; }
            setOptions(opts) {
                opts = opts || {};
                if (opts.radius != null) { this._radius = opts.radius; }
                if (opts.gradient != null) { this._gradient = opts.gradient; }
                if (opts.maxIntensity != null) { this._maxIntensity = opts.maxIntensity; }
                if (opts.opacity != null) { this._minOpacity = opts.opacity; }
                if (opts.data != null) { this._setDataInternal(opts.data); }
                this._redraw();
            }
            // OJO: NO sobreescribir set(key, value). OverlayView ES un MVCObject y
            // setMap() llama internamente this.set('map', ...); pisarlo rompe el
            // registro del mapa y onAdd/draw nunca disparan. El controller no usa set().

            // --- OverlayView lifecycle ---
            onAdd() {
                var canvas = document.createElement('canvas');
                canvas.style.position = 'absolute';
                canvas.style.pointerEvents = 'none';
                this._canvas = canvas;
                this._heat = new SimpleHeat(canvas);
                if (this._gradient) { this._heat.gradient(this._gradient); }
                var panes = this.getPanes();
                if (panes) { panes.overlayLayer.appendChild(canvas); }
            }

            onRemove() {
                if (this._canvas && this._canvas.parentNode) {
                    this._canvas.parentNode.removeChild(this._canvas);
                }
                this._canvas = null;
                this._heat = null;
            }

            _redraw() { if (this._canvas && this.getMap()) { this.draw(); } }

            draw() {
                var canvas = this._canvas, heat = this._heat;
                if (!canvas || !heat) { return; }
                var proj = this.getProjection();
                var map = this.getMap();
                if (!proj || !map) { return; }
                var bounds = map.getBounds();
                if (!bounds) { return; }

                // Caja del viewport en pixeles del pane (overlayLayer).
                var ne = proj.fromLatLngToDivPixel(bounds.getNorthEast());
                var sw = proj.fromLatLngToDivPixel(bounds.getSouthWest());
                var left = sw.x, top = ne.y;
                var w = Math.max(1, Math.round(ne.x - sw.x));
                var h = Math.max(1, Math.round(sw.y - ne.y));

                canvas.style.left = left + 'px';
                canvas.style.top = top + 'px';
                canvas.width = w;     // reasignar width/height limpia el canvas
                canvas.height = h;

                var r = this._radius;
                var max = this._maxIntensity || 0;
                var data = [];
                for (var i = 0; i < this._points.length; i++) {
                    var pt = this._points[i];
                    if (!this._maxIntensity && pt.w > max) { max = pt.w; }
                }
                if (max <= 0) { max = 1; }
                for (var k = 0; k < this._points.length; k++) {
                    var p = this._points[k];
                    var px = proj.fromLatLngToDivPixel(p.latLng);
                    var x = px.x - left, y = px.y - top;
                    if (x < -r || x > w + r || y < -r || y > h + r) { continue; } // fuera del viewport
                    data.push([Math.round(x), Math.round(y), p.w]);
                }

                heat.radius(r, this._blur).max(max).data(data).draw(this._minOpacity);
            }
        };
        SgHeatmapLayer.__sgPolyfill = true;

        // Expongo la clase como global: el HeatMapController la usa directo
        // (new (window.__SgHeatmapLayer || ...)), asi anda aunque el build cargue
        // 'visualization' y no se pueda pisar el HeatmapLayer no-configurable de Google.
        try { window.__SgHeatmapLayer = SgHeatmapLayer; } catch (e) { }

        // En v3.65 HeatmapLayer suele ser un getter NO-escribible que tira: la
        // asignacion directa falla (en strict mode tira). Probamos defineProperty y,
        // si no quedo, fallbacks: delete+assign y reemplazo del namespace completo.
        function _installed() {
            try { return google.maps.visualization.HeatmapLayer === SgHeatmapLayer; }
            catch (e) { return false; }
        }
        try { Object.defineProperty(google.maps.visualization, 'HeatmapLayer', { value: SgHeatmapLayer, writable: true, configurable: true }); } catch (e) {}
        if (!_installed()) { try { delete google.maps.visualization.HeatmapLayer; google.maps.visualization.HeatmapLayer = SgHeatmapLayer; } catch (e) {} }
        if (!_installed()) { try { google.maps.visualization = { HeatmapLayer: SgHeatmapLayer }; } catch (e) {} }
        if (!_installed()) { try { Object.defineProperty(google.maps, 'visualization', { value: { HeatmapLayer: SgHeatmapLayer }, writable: true, configurable: true }); } catch (e) {} }
    }

    // Exponer global para que GMapPanel6.apiReady() lo invoque.
    if (typeof window !== 'undefined') {
        window.installSgHeatmapPolyfill = installSgHeatmapPolyfill;
    }

    // Auto-instalar cuando google.maps este listo, SIN depender del apiReady de
    // ningun panel: en MapGuard el mapa lo puede cargar GmapPanel (no gmappanel6),
    // y ahi el apiReady de gmappanel6 que llama installSgHeatmapPolyfill nunca corre,
    // dejando window.__SgHeatmapLayer undefined. Con este poller, apenas carga el
    // mapa se instala y queda la clase global lista para el HeatMapController.
    (function waitMaps(tries) {
        try {
            if (window.google && google.maps && google.maps.OverlayView) {
                installSgHeatmapPolyfill();
                return;
            }
        } catch (e) { }
        if (tries > 0) { setTimeout(function () { waitMaps(tries - 1); }, 300); }
    })(200); // ~60s de margen para que cargue Google Maps
})();
