import gulp from 'gulp';
import { exec } from 'node:child_process';

function runRollup(cb) {
  return exec('rollup --config rollup.config.mjs --watch');
  cb();
}

function runServe(cb) {
  return exec('browser-sync start --server --files build/*.js');
  cb();
}

const defaultTask = gulp.parallel(runRollup, runServe);

gulp.task(
  'default', defaultTask
);