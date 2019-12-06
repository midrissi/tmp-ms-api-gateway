const { ClientProxyFactory, Transport } = require('@nestjs/microservices');

const c = ClientProxyFactory.create({
  transport: Transport.TCP,
  options: {
    port: 5000,
  }
});

(async () => {
  for(let i = 0; i < 100; i++) {
    const t = Date.now();
    const obs = c.send('cabins:create', { i, t });
    const data = await obs.toPromise();
    console.log(data, t, i);
    if(t !== data.t || i !== data.i) {
      console.error('Error:', data, i, t);
    }
  }

  c.close();
})();
