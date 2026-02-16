<h1 data-start="137" data-end="198">Spotify API REST: Artistas y Canciones
  (rutas anidadas)</h1>
<h2 data-start="200" data-end="211">Contexto</h2>
<p data-start="213" data-end="463">En la sesión anterior se ha implementado una
  API REST con Express (CRUD) siguiendo el ejemplo de TODOs.<br data-start="316"
    data-end="319">En esta actividad se pide crear una nueva API REST para
  gestionar <strong data-start="385" data-end="397">artistas</strong> y sus
  <strong data-start="404" data-end="417">canciones</strong>, aplicando el
  concepto de <strong data-start="444" data-end="462">rutas anidadas</strong>.
</p>
<p data-start="465" data-end="615">En esta API <strong data-start="477"
    data-end="490">NO existe</strong> <code data-start="491"
    data-end="499">/songs</code> como recurso accesible directamente.<br
    data-start="536" data-end="539">Las canciones solo se pueden consultar y
  gestionar <strong data-start="590" data-end="614">a través del
    artista</strong>.</p>
<hr data-start="617" data-end="620">
<h2 data-start="622" data-end="633">Objetivo</h2>
<p data-start="635" data-end="696">Crear un servicio REST con <strong
    data-start="662" data-end="683">Node.js + Express</strong> que permita:</p>
<ul>
  <li data-start="700" data-end="729">Gestionar <strong data-start="710"
      data-end="722">artistas</strong> (CRUD)</li>
  <li data-start="732" data-end="800">Gestionar <strong data-start="742"
      data-end="769">canciones de un artista</strong> mediante rutas anidadas
    (CRUD)</li>
  <li data-start="803" data-end="860">Validar datos y responder con <strong
      data-start="833" data-end="849">status codes</strong> coherentes</li>
  <li data-start="863" data-end="918">Persistencia <strong data-start="876"
      data-end="890">en memoria</strong> (arrays), sin base de datos</li>
</ul>
<hr data-start="920" data-end="923">
<h2 data-start="925" data-end="943">Modelo de datos</h2>
<h3 data-start="945" data-end="956">Artista</h3>
<ul>
  <li data-start="959" data-end="972"><code data-start="959"
      data-end="963">id</code> (number)</li>
  <li data-start="975" data-end="990"><code data-start="975"
      data-end="981">name</code> (string)</li>
</ul>
<p data-start="992" data-end="1000">Ejemplo:</p>
<div
  class="contain-inline-size rounded-2xl corner-superellipse/1.1 relative bg-token-sidebar-surface-primary">
  <div class="sticky top-[calc(var(--sticky-padding-top)+9*var(--spacing))]">
    <div class="absolute end-0 bottom-0 flex h-9 items-center pe-2">
      <div
        class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs">
         </div>
    </div>
  </div>
  <div class="overflow-y-auto p-4" dir="ltr"><code
      class="whitespace-pre! language-json"><span
        class="hljs-punctuation">{</span> <span
        class="hljs-attr">"id"</span><span class="hljs-punctuation">:</span>
      <span class="hljs-number">44</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">"name"</span><span
        class="hljs-punctuation">:</span> <span class="hljs-string">"Daft
        Punk"</span> <span class="hljs-punctuation">}</span>
    </code></div>
</div>
<h3 data-start="1048" data-end="1059">Canción</h3>
<ul>
  <li data-start="1062" data-end="1075"><code data-start="1062"
      data-end="1066">id</code> (number)</li>
  <li data-start="1078" data-end="1093"><code data-start="1078"
      data-end="1084">name</code> (string)</li>
  <li data-start="1096" data-end="1126"><code data-start="1096"
      data-end="1106">duration</code> (number) → segundos</li>
</ul>
<p data-start="1128" data-end="1277"><strong data-start="1128"
    data-end="1143">Importante:</strong> en el modelo puede existir internamente
  <code data-start="1184" data-end="1194">idArtist</code>, pero <strong
    data-start="1201" data-end="1219">a nivel de API</strong> la relación la
  define la ruta (<code data-start="1251"
    data-end="1275">/artists/:idArtist/...</code>).</p>
<p data-start="1279" data-end="1287">Ejemplo:</p>
<div
  class="contain-inline-size rounded-2xl corner-superellipse/1.1 relative bg-token-sidebar-surface-primary">
  <div class="sticky top-[calc(var(--sticky-padding-top)+9*var(--spacing))]">
    <div class="absolute end-0 bottom-0 flex h-9 items-center pe-2">
      <div
        class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs">
         </div>
    </div>
  </div>
  <div class="overflow-y-auto p-4" dir="ltr"><code
      class="whitespace-pre! language-json"><span
        class="hljs-punctuation">{</span> <span
        class="hljs-attr">"id"</span><span class="hljs-punctuation">:</span>
      <span class="hljs-number">3</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">"name"</span><span
        class="hljs-punctuation">:</span> <span class="hljs-string">"One More
        Time"</span><span class="hljs-punctuation">,</span> <span
        class="hljs-attr">"duration"</span><span
        class="hljs-punctuation">:</span> <span class="hljs-number">320</span>
      <span class="hljs-punctuation">}</span>
    </code></div>
</div>
<hr data-start="1355" data-end="1358">
<h2 data-start="1360" data-end="1383">Requisitos generales</h2>
<ul>
  <li data-start="1387" data-end="1436">Express (estructura similar al proyecto
    de TODOs)</li>
  <li data-start="1439" data-end="1464">Datos en memoria (arrays)</li>
  <li data-start="1467" data-end="1485">Respuestas en JSON</li>
  <li data-start="1488" data-end="1534">Script para arrancar (por ejemplo <code
      data-start="1522" data-end="1533">npm start</code>)</li>
  <li data-start="1537" data-end="1593">Se recomienda incluir datos iniciales
    para probar la API</li>
</ul>
<hr data-start="1595" data-end="1598">
<h2 data-start="1600" data-end="1625">Endpoints obligatorios</h2>
<h3 data-start="1627" data-end="1649">1) Artistas (CRUD)</h3>
<ul>
  <li data-start="1653" data-end="1669"><code data-start="1653"
      data-end="1667">GET /artists</code></li>
  <li data-start="1672" data-end="1698"><code data-start="1672"
      data-end="1696">GET /artists/:idArtist</code></li>
  <li data-start="1701" data-end="1718"><code data-start="1701"
      data-end="1716">POST /artists</code>
    <ul>
      <li data-start="1723" data-end="1748">Body: <code data-start="1729"
          data-end="1748">{ "name": "..." }</code></li>
      <li data-start="1753" data-end="1769">Respuesta: <code data-start="1764"
          data-end="1769">201</code></li>
    </ul>
  </li>
  <li data-start="1772" data-end="1798"><code data-start="1772"
      data-end="1796">PUT /artists/:idArtist</code>
    <ul>
      <li data-start="1803" data-end="1828">Body: <code data-start="1809"
          data-end="1828">{ "name": "..." }</code></li>
    </ul>
  </li>
  <li data-start="1831" data-end="1858"><code data-start="1831"
      data-end="1858">DELETE /artists/:idArtist</code></li>
</ul>
<p data-start="1860" data-end="1891">Si el artista no existe: <code
    data-start="1885" data-end="1890">404</code>.</p>
<hr data-start="1893" data-end="1896">
<h3 data-start="1898" data-end="1943">2) Canciones de un artista (CRUD anidado)
</h3>
<p data-start="1945" data-end="2002">⚠️ <strong data-start="1948"
    data-end="1968">No puede existir</strong> <code data-start="1969"
    data-end="1981">GET /songs</code>, <code data-start="1983"
    data-end="1996">POST /songs</code>, etc.</p>
<p data-start="2004" data-end="2046">El CRUD de canciones debe ser exactamente:
</p>
<ul>
  <li data-start="2050" data-end="2082"><code data-start="2050"
      data-end="2080">GET /artists/:idArtist/songs</code>
    <ul>
      <li data-start="2087" data-end="2127">Devuelve todas las canciones del
        artista</li>
      <li data-start="2132" data-end="2162">Si el artista no existe: <code
          data-start="2157" data-end="2162">404</code></li>
    </ul>
  </li>
  <li data-start="2166" data-end="2206"><code data-start="2166"
      data-end="2204">GET /artists/:idArtist/songs/:idSong</code>
    <ul>
      <li data-start="2211" data-end="2252">Devuelve una canción concreta del
        artista</li>
      <li data-start="2257" data-end="2287">Si el artista no existe: <code
          data-start="2282" data-end="2287">404</code></li>
      <li data-start="2292" data-end="2344">Si la canción no existe dentro de
        ese artista: <code data-start="2339" data-end="2344">404</code></li>
    </ul>
  </li>
  <li data-start="2348" data-end="2381"><code data-start="2348"
      data-end="2379">POST /artists/:idArtist/songs</code>
    <ul data-start="2663" data-end="2900">
      <li data-start="2386" data-end="2419">Crea una canción para ese artista
      </li>
      <li data-start="2424" data-end="2429">Body:
        <ul data-start="2663" data-end="2900">
          <li data-start="2436" data-end="2456"><code data-start="2436"
              data-end="2442">name</code> (obligatorio)</li>
        </ul>
      </li>
      <li data-start="2463" data-end="2499"><code data-start="2463"
          data-end="2473">duration</code> (obligatorio, número &gt; 0)</li>
      <li data-start="2504" data-end="2534">Si el artista no existe: <code
          data-start="2529" data-end="2534">404</code></li>
      <li data-start="2539" data-end="2578">Si faltan campos o son inválidos:
        <code data-start="2573" data-end="2578">400</code></li>
      <li data-start="2583" data-end="2616">Respuesta: <code data-start="2594"
          data-end="2599">201</code> + canción creada</li>
    </ul>
  </li>
  <li data-start="2620" data-end="2660"><code data-start="2620"
      data-end="2658">PUT /artists/:idArtist/songs/:idSong</code>
    <ul>
      <li data-start="2665" data-end="2700">Actualiza la canción de ese artista
      </li>
      <li data-start="2705" data-end="2710">Body:
        <ul>
          <li data-start="2717" data-end="2737"><code data-start="2717"
              data-end="2723">name</code> (obligatorio)</li>
          <li data-start="2744" data-end="2780"><code data-start="2744"
              data-end="2754">duration</code> (obligatorio, número &gt; 0)</li>
        </ul>
      </li>
      <li data-start="2785" data-end="2815">Si el artista no existe: <code
          data-start="2810" data-end="2815">404</code></li>
      <li data-start="2820" data-end="2872">Si la canción no existe dentro de
        ese artista: <code data-start="2867" data-end="2872">404</code></li>
      <li data-start="2877" data-end="2900">Si body inválido: <code
          data-start="2895" data-end="2900">400</code></li>
    </ul>
  </li>
  <li data-start="2904" data-end="2947"><code data-start="2904"
      data-end="2945">DELETE /artists/:idArtist/songs/:idSong</code>
    <ul>
      <li data-start="2952" data-end="2982">Si el artista no existe: <code
          data-start="2977" data-end="2982">404</code></li>
      <li data-start="2987" data-end="3039">Si la canción no existe dentro de
        ese artista: <code data-start="3034" data-end="3039">404</code></li>
    </ul>
  </li>
</ul>
<hr data-start="3041" data-end="3044">
<h2 data-start="3046" data-end="3076">Reglas de validación mínima</h2>
<ul>
  <li data-start="3080" data-end="3147">Los parámetros <code data-start="3095"
      data-end="3106">:idArtist</code> y <code data-start="3109"
      data-end="3118">:idSong</code> deben tratarse como números:
    <ul>
      <li data-start="3152" data-end="3182">Si no es número válido → <code
          data-start="3177" data-end="3182">400</code></li>
    </ul>
  </li>
  <li data-start="3185" data-end="3216">En <code data-start="3188"
      data-end="3194">POST</code> y <code data-start="3197"
      data-end="3202">PUT</code> de canciones:
    <ul>
      <li data-start="3221" data-end="3272"><code data-start="3221"
          data-end="3227">name</code> obligatorio (string no vacío) → si no,
        <code data-start="3267" data-end="3272">400</code></li>
      <li data-start="3277" data-end="3320"><code data-start="3277"
          data-end="3287">duration</code> obligatorio y &gt; 0 → si no, <code
          data-start="3315" data-end="3320">400</code></li>
    </ul>
  </li>
</ul>
<hr data-start="3322" data-end="3325">
<h2 data-start="3327" data-end="3362">Reglas de coherencia importantes</h2>
<ul>
  <li data-start="3366" data-end="3429">Una canción solo puede “existir” dentro
    del artista de la ruta.</li>
  <li data-start="3432" data-end="3531">Si se pide <code data-start="3443"
      data-end="3464">/artists/44/songs/7</code>, <strong data-start="3466"
      data-end="3477">no vale</strong> devolver una canción 7 que pertenezca a
    otro artista.</li>
  <li data-start="3534" data-end="3617"><code data-start="3534"
      data-end="3564">GET /artists/:idArtist/songs</code> debe devolver <strong
      data-start="3579" data-end="3587">solo</strong> las canciones de ese
    artista.</li>
</ul>
<hr data-start="3619" data-end="3622">
<h2 data-start="3624" data-end="3652">Extras opcionales (bonus)</h2>
<p data-start="3654" data-end="3679">Implementar al menos uno:</p>
<ol data-start="3681" data-end="4019">
  <li data-start="3681" data-end="3769">
    <p data-start="3684" data-end="3769">Generación de IDs robusta (por ejemplo,
      evitar colisiones aunque se borren canciones)</p>
  </li>
  <li data-start="3770" data-end="3832">
    <p data-start="3773" data-end="3780">Filtro:</p>
    <ul data-start="3784" data-end="3832">
      <li data-start="3784" data-end="3832">
        <p data-start="3786" data-end="3832"><code data-start="3786"
            data-end="3832">GET /artists/:idArtist/songs?minDuration=200</code>
        </p>
      </li>
    </ul>
  </li>
  <li data-start="3833" data-end="3911">
    <p data-start="3836" data-end="3847">Ordenación:</p>
    <ul data-start="3851" data-end="3911">
      <li data-start="3851" data-end="3911">
        <p data-start="3853" data-end="3911"><code data-start="3853"
            data-end="3897">GET /artists/:idArtist/songs?sort=duration</code> o
          <code data-start="3900" data-end="3911">sort=name</code></p>
      </li>
    </ul>
  </li>
  <li data-start="3912" data-end="4019">
    <p data-start="3915" data-end="4019">Al devolver un artista (<code
        data-start="3939" data-end="3963">GET /artists/:idArtist</code>),
      incluir también el número de canciones (<code data-start="4006"
        data-end="4018">songsCount</code>)</p>
  </li>
</ol>
<hr data-start="4021" data-end="4024">
<h2 data-start="4026" data-end="4036">Entrega</h2>
<p data-start="4038" data-end="4051">Debe incluir:</p>
<ul>
  <li data-start="4055" data-end="4085">Código fuente + <code data-start="4071"
      data-end="4085">package.json</code></li>
  <li data-start="4088" data-end="4099">README con:
    <ul>
      <li data-start="4104" data-end="4129">cómo arrancar el servidor</li>
      <li data-start="4134" data-end="4152">lista de endpoints</li>
      <li data-start="4157" data-end="4219">screenshots de pruebas (curl /
        Thunder Client / Postman), mínimo:
        <ul>
          <li data-start="4226" data-end="4240">1 POST artista</li>
          <li data-start="4247" data-end="4277">1 POST canción para un artista
          </li>
          <li data-start="4284" data-end="4309">1 GET songs de un artista</li>
          <li data-start="4316" data-end="4326">1 PUT song</li>
          <li data-start="4333" data-end="4346">1 DELETE song</li>
        </ul>
      </li>
    </ul>
  </li>
</ul>