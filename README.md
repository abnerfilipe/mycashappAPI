# My CashApp API

Api desenvolvida em nodejs, typescript e typeorm juntamente com banco de dados postgres.



## Comandos

Para rodar a é necessario utilizar a seguinte ordem:

1. Install Dependencys

   ```
   npm install
   ```

2. Setup the enviroment variables

   Checar o arquivo .env.example e copiar para .env e inserir as variaveis corretas para o funcionamento do servidor.

3. Run Database Migrations 

   ```
   npm run typeorm migration:run 
   ```

4. Check if migrtions worked 

   ```
   npm run typeorm migration:show 
   ```

5. Run server in development mode

   ```
   npm run dev
   ```

   

