import gulp from 'gulp';
import { exec } from 'node:child_process';
import fs from 'node:fs';

function runRollup(cb) {
  return exec('rollup --config rollup.config.mjs --watch');
}

function runServe(cb) {
  return exec('browser-sync start --server --files build/*.js');
}

/** @deprecated **/
async function buildLSystem(cb) {
  let json = fs.readFileSync('./pitaya.config.json', { encoding: 'utf-8' });
  const config = JSON.parse(json);
  
  // read in the lsystem config
  // read file at the name of the lsystem
  json = fs.readFileSync(`./assets/lsystems/${config.lsystem.name}.lsystem.json`, { encoding: 'utf-8' });
  const lsystemConfig = JSON.parse(json);
  let l = '{';
  l += 'axiom:"' + (await import(`./assets/axioms/${lsystemConfig.axiom}.axiom.mjs`)).default + '",';
  l += 'productions:{';
  await Promise.all(
    Object.keys(lsystemConfig.productions).map(async (k) => {
      const fileName = lsystemConfig.productions[k];
      l += `'${k}':"` + (await import(`./assets/productions/${fileName}.production.mjs`)).default + '",';
    })
  );
  l+='},'
  l += 'finals:{';
  (await Promise.all(
    Object.keys(lsystemConfig.finals).map(async (k) => {
      const fileName = lsystemConfig.finals[k];
      return `'${k}':` + (await import(`./assets/finals/${fileName}.final.mjs`)).default.toString() + ',';
    })
  )).forEach(s => l += s);
  l += '},';
  l += `iterations:${config.lsystem.iterations},`;
  l += '};';

  fs.writeFileSync(
    './src/lsystem.config.js',
    `/*Auto generated file. Do not edit.*/
  export default ${l}`.trim()
  );

  cb();
}

const defaultTask = gulp.parallel(runRollup, runServe);

gulp.task(
  'default', defaultTask
);

/**
 * Functions for building L System using configs
 */
