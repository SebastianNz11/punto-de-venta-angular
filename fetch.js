fetch('http://localhost:3000/detalle-venta').then(res=>res.json()).then(data=>require('fs').writeFileSync('out_detalle.json', JSON.stringify(data, null, 2)))
