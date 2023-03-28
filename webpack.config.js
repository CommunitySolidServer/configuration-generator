const path = require('path');
const exec = require('child_process').exec;

class AfterExportPlugin {
  apply(compiler) {
    // Specify the event hook to attach to
    compiler.hooks.afterEmit.tapAsync('AfterExportPlugin', _ => {
      console.log('>>>> Compiling EJS templates <<<<<<');
      exec('npm run ejs', (err, stdout, stderr) => {
        if (stdout) process.stdout.write(stdout);
        if (stderr) process.stderr.write(stderr);
      });
    });
  }
}

module.exports = {
  entry: './src/script.ts',
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(scss)$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: () => [
                  require('autoprefixer')
                ]
              }
            }
          },
          {
            loader: 'sass-loader'
          }],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'webpack'),
  },
  plugins: [
    // Build EJS templates after webpack has finished outputting files to webpack folder
    new AfterExportPlugin(),
  ]
};
