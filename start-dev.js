import {spawn} from 'child_process';
const asciiArt = `
      ************       
   ******************    
  *********************  
 *********************** 
*************************
*************************
*************************
*****   *********   *****
******    *****    ******
 *******  *****  ******* 
  #*******************   
    *****************    
     ***************     
       ***********       
         *******       
`;
console.log(asciiArt);

console.log('Iniciando o ambiente local de desenvolvimento com Vite...\n');

const viteCommand = 'vite'; 
const viteProcess = spawn(viteCommand, [], {
  stdio: 'inherit',
  shell: true
});

// Opcional: Lidar com erros ao tentar iniciar o processo Vite
viteProcess.on('error', (err) => {
  console.error(`Erro ao iniciar o Vite: ${err}`);
});

viteProcess.on('close', (code) => {
  console.log(`Processo Vite encerrado com código ${code}`);
});