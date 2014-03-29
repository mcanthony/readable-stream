/* This file lists the files to be fetched from the node repo
 * in the /lib/ directory which will be placed in the ../lib/
 * directory after having each of the "replacements" in the
 * array for that file applied to it. The replacements are
 * simply the arguments to String#replace, so they can be
 * strings, regexes, functions.
 */

const requireReplacement = [
          /(require\(['"])(_stream_)/g
        , '$1./$2'
      ]

    , eeListenerCountReplacement = [
          /(require\('events'\)\.EventEmitter;)/
        ,   '$1\n'
          + 'if (!EE.listenerCount) EE.listenerCount = function(emitter, type) {\n'
          + '  return emitter.listeners(type).length;\n'
          + '};'
      ]

    , instanceofReplacement = [
          /instanceof Stream\.(\w+)/g
        , function (match, streamType) {
            return 'instanceof ' + streamType
          }
      ]

      // use the string_decoder in node_modules rather than core
    , stringDecoderReplacement = [
          /(require\(['"])(string_decoder)(['"]\))/g
        , '$1$2/$3'
      ]

    , bufferReplacement = [
          /^(var util = require\('util'\);)/m
        , '$1\nvar Buffer = require(\'buffer\').Buffer;'
      ]

    , addDuplexRequire = [
          /^(function Writable\(options\) \{)/m
        , '$1\n  var Duplex = require(\'./_stream_duplex\');\n'
      ]

    , altForEachImplReplacement = require('./common-replacements').altForEachImplReplacement
    , altForEachUseReplacement  = require('./common-replacements').altForEachUseReplacement
    , altIndexOfImplReplacement = require('./common-replacements').altIndexOfImplReplacement
    , altIndexOfUseReplacement  = require('./common-replacements').altIndexOfUseReplacement

    , isArrayDefine = [
          /^(var util = require\('util'\);)/m
        , '$1\nvar isArray = require(\'isarray\');'
      ]
    , isArrayReplacement = [
          /Array\.isArray/g
        , 'isArray'
      ]
    , objectKeysDefine = [
          /^(var util = require\('util'\);)/m
        , '$1\nvar objectKeys = Object.keys || function (obj) {\n'
          + '  var keys = [];\n'
          + '  for (var key in obj) keys.push(key);\n'
          + '  return keys;\n'
          + '}\n'
      ]
    , objectKeysReplacement = [
          /Object\.keys/g
        , 'objectKeys'
      ]

    , debugLogReplacement = [
          /var debug = util.debuglog\('stream'\);/
      ,   'var debug = require(\'util\');\n'
        + 'if (debug && debug.debuglog) {\n'
        + '  debug = debug.debuglog(\'stream\');\n'
        + '} else {\n'
        + '  debug = function () {};\n'
        + '}\n'
      ]

module.exports['_stream_duplex.js'] = [
    requireReplacement
  , instanceofReplacement
  , stringDecoderReplacement
  , altForEachImplReplacement
  , altForEachUseReplacement
  , objectKeysReplacement
  , objectKeysDefine
]

module.exports['_stream_passthrough.js'] = [
    requireReplacement
  , instanceofReplacement
  , stringDecoderReplacement
]

module.exports['_stream_readable.js'] = [
    requireReplacement
  , eeListenerCountReplacement
  , instanceofReplacement
  , bufferReplacement
  , altForEachImplReplacement
  , altForEachUseReplacement
  , altIndexOfImplReplacement
  , altIndexOfUseReplacement
  , instanceofReplacement
  , stringDecoderReplacement
  , bufferReplacement
  , isArrayDefine
  , isArrayReplacement

  , [
        /var debug = util\.debuglog\('stream'\);/
      , 'var debug;\n'
        + 'if (util.debuglog)\n'
        + '  debug = util.debuglog(\'stream\');\n'
        + 'else try {\n'
        + '  debug = require(\'debuglog\')(\'stream\');\n'
        + '} catch (er) {\n'
        + '  debug = function() {};\n'
        + '}'
    ]
  , debugLogReplacement

]

module.exports['_stream_transform.js'] = [
    requireReplacement
  , instanceofReplacement
  , stringDecoderReplacement
]

module.exports['_stream_writable.js'] = [
    addDuplexRequire
  , requireReplacement
  , instanceofReplacement
  , bufferReplacement
  , stringDecoderReplacement
]
