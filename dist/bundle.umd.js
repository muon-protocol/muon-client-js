(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.muon = factory());
}(this, (function () { 'use strict';

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
      var info = gen[key](arg);
      var value = info.value;
    } catch (error) {
      reject(error);
      return;
    }

    if (info.done) {
      resolve(value);
    } else {
      Promise.resolve(value).then(_next, _throw);
    }
  }

  function _asyncToGenerator(fn) {
    return function () {
      var self = this,
          args = arguments;
      return new Promise(function (resolve, reject) {
        var gen = fn.apply(self, args);

        function _next(value) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
        }

        function _throw(err) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
        }

        _next(undefined);
      });
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function getAugmentedNamespace(n) {
  	if (n.__esModule) return n;
  	var a = Object.defineProperty({}, '__esModule', {value: true});
  	Object.keys(n).forEach(function (k) {
  		var d = Object.getOwnPropertyDescriptor(n, k);
  		Object.defineProperty(a, k, d.get ? d : {
  			enumerable: true,
  			get: function () {
  				return n[k];
  			}
  		});
  	});
  	return a;
  }

  function createCommonjsModule(fn) {
    var module = { exports: {} };
  	return fn(module, module.exports), module.exports;
  }

  /**
   * Copyright (c) 2014-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  var runtime_1 = createCommonjsModule(function (module) {
  var runtime = (function (exports) {

    var Op = Object.prototype;
    var hasOwn = Op.hasOwnProperty;
    var undefined$1; // More compressible than void 0.
    var $Symbol = typeof Symbol === "function" ? Symbol : {};
    var iteratorSymbol = $Symbol.iterator || "@@iterator";
    var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
    var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

    function define(obj, key, value) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
      return obj[key];
    }
    try {
      // IE 8 has a broken Object.defineProperty that only works on DOM objects.
      define({}, "");
    } catch (err) {
      define = function(obj, key, value) {
        return obj[key] = value;
      };
    }

    function wrap(innerFn, outerFn, self, tryLocsList) {
      // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
      var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
      var generator = Object.create(protoGenerator.prototype);
      var context = new Context(tryLocsList || []);

      // The ._invoke method unifies the implementations of the .next,
      // .throw, and .return methods.
      generator._invoke = makeInvokeMethod(innerFn, self, context);

      return generator;
    }
    exports.wrap = wrap;

    // Try/catch helper to minimize deoptimizations. Returns a completion
    // record like context.tryEntries[i].completion. This interface could
    // have been (and was previously) designed to take a closure to be
    // invoked without arguments, but in all the cases we care about we
    // already have an existing method we want to call, so there's no need
    // to create a new function object. We can even get away with assuming
    // the method takes exactly one argument, since that happens to be true
    // in every case, so we don't have to touch the arguments object. The
    // only additional allocation required is the completion record, which
    // has a stable shape and so hopefully should be cheap to allocate.
    function tryCatch(fn, obj, arg) {
      try {
        return { type: "normal", arg: fn.call(obj, arg) };
      } catch (err) {
        return { type: "throw", arg: err };
      }
    }

    var GenStateSuspendedStart = "suspendedStart";
    var GenStateSuspendedYield = "suspendedYield";
    var GenStateExecuting = "executing";
    var GenStateCompleted = "completed";

    // Returning this object from the innerFn has the same effect as
    // breaking out of the dispatch switch statement.
    var ContinueSentinel = {};

    // Dummy constructor functions that we use as the .constructor and
    // .constructor.prototype properties for functions that return Generator
    // objects. For full spec compliance, you may wish to configure your
    // minifier not to mangle the names of these two functions.
    function Generator() {}
    function GeneratorFunction() {}
    function GeneratorFunctionPrototype() {}

    // This is a polyfill for %IteratorPrototype% for environments that
    // don't natively support it.
    var IteratorPrototype = {};
    define(IteratorPrototype, iteratorSymbol, function () {
      return this;
    });

    var getProto = Object.getPrototypeOf;
    var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
    if (NativeIteratorPrototype &&
        NativeIteratorPrototype !== Op &&
        hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
      // This environment has a native %IteratorPrototype%; use it instead
      // of the polyfill.
      IteratorPrototype = NativeIteratorPrototype;
    }

    var Gp = GeneratorFunctionPrototype.prototype =
      Generator.prototype = Object.create(IteratorPrototype);
    GeneratorFunction.prototype = GeneratorFunctionPrototype;
    define(Gp, "constructor", GeneratorFunctionPrototype);
    define(GeneratorFunctionPrototype, "constructor", GeneratorFunction);
    GeneratorFunction.displayName = define(
      GeneratorFunctionPrototype,
      toStringTagSymbol,
      "GeneratorFunction"
    );

    // Helper for defining the .next, .throw, and .return methods of the
    // Iterator interface in terms of a single ._invoke method.
    function defineIteratorMethods(prototype) {
      ["next", "throw", "return"].forEach(function(method) {
        define(prototype, method, function(arg) {
          return this._invoke(method, arg);
        });
      });
    }

    exports.isGeneratorFunction = function(genFun) {
      var ctor = typeof genFun === "function" && genFun.constructor;
      return ctor
        ? ctor === GeneratorFunction ||
          // For the native GeneratorFunction constructor, the best we can
          // do is to check its .name property.
          (ctor.displayName || ctor.name) === "GeneratorFunction"
        : false;
    };

    exports.mark = function(genFun) {
      if (Object.setPrototypeOf) {
        Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
      } else {
        genFun.__proto__ = GeneratorFunctionPrototype;
        define(genFun, toStringTagSymbol, "GeneratorFunction");
      }
      genFun.prototype = Object.create(Gp);
      return genFun;
    };

    // Within the body of any async function, `await x` is transformed to
    // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
    // `hasOwn.call(value, "__await")` to determine if the yielded value is
    // meant to be awaited.
    exports.awrap = function(arg) {
      return { __await: arg };
    };

    function AsyncIterator(generator, PromiseImpl) {
      function invoke(method, arg, resolve, reject) {
        var record = tryCatch(generator[method], generator, arg);
        if (record.type === "throw") {
          reject(record.arg);
        } else {
          var result = record.arg;
          var value = result.value;
          if (value &&
              typeof value === "object" &&
              hasOwn.call(value, "__await")) {
            return PromiseImpl.resolve(value.__await).then(function(value) {
              invoke("next", value, resolve, reject);
            }, function(err) {
              invoke("throw", err, resolve, reject);
            });
          }

          return PromiseImpl.resolve(value).then(function(unwrapped) {
            // When a yielded Promise is resolved, its final value becomes
            // the .value of the Promise<{value,done}> result for the
            // current iteration.
            result.value = unwrapped;
            resolve(result);
          }, function(error) {
            // If a rejected Promise was yielded, throw the rejection back
            // into the async generator function so it can be handled there.
            return invoke("throw", error, resolve, reject);
          });
        }
      }

      var previousPromise;

      function enqueue(method, arg) {
        function callInvokeWithMethodAndArg() {
          return new PromiseImpl(function(resolve, reject) {
            invoke(method, arg, resolve, reject);
          });
        }

        return previousPromise =
          // If enqueue has been called before, then we want to wait until
          // all previous Promises have been resolved before calling invoke,
          // so that results are always delivered in the correct order. If
          // enqueue has not been called before, then it is important to
          // call invoke immediately, without waiting on a callback to fire,
          // so that the async generator function has the opportunity to do
          // any necessary setup in a predictable way. This predictability
          // is why the Promise constructor synchronously invokes its
          // executor callback, and why async functions synchronously
          // execute code before the first await. Since we implement simple
          // async functions in terms of async generators, it is especially
          // important to get this right, even though it requires care.
          previousPromise ? previousPromise.then(
            callInvokeWithMethodAndArg,
            // Avoid propagating failures to Promises returned by later
            // invocations of the iterator.
            callInvokeWithMethodAndArg
          ) : callInvokeWithMethodAndArg();
      }

      // Define the unified helper method that is used to implement .next,
      // .throw, and .return (see defineIteratorMethods).
      this._invoke = enqueue;
    }

    defineIteratorMethods(AsyncIterator.prototype);
    define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
      return this;
    });
    exports.AsyncIterator = AsyncIterator;

    // Note that simple async functions are implemented on top of
    // AsyncIterator objects; they just return a Promise for the value of
    // the final result produced by the iterator.
    exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
      if (PromiseImpl === void 0) PromiseImpl = Promise;

      var iter = new AsyncIterator(
        wrap(innerFn, outerFn, self, tryLocsList),
        PromiseImpl
      );

      return exports.isGeneratorFunction(outerFn)
        ? iter // If outerFn is a generator, return the full iterator.
        : iter.next().then(function(result) {
            return result.done ? result.value : iter.next();
          });
    };

    function makeInvokeMethod(innerFn, self, context) {
      var state = GenStateSuspendedStart;

      return function invoke(method, arg) {
        if (state === GenStateExecuting) {
          throw new Error("Generator is already running");
        }

        if (state === GenStateCompleted) {
          if (method === "throw") {
            throw arg;
          }

          // Be forgiving, per 25.3.3.3.3 of the spec:
          // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
          return doneResult();
        }

        context.method = method;
        context.arg = arg;

        while (true) {
          var delegate = context.delegate;
          if (delegate) {
            var delegateResult = maybeInvokeDelegate(delegate, context);
            if (delegateResult) {
              if (delegateResult === ContinueSentinel) continue;
              return delegateResult;
            }
          }

          if (context.method === "next") {
            // Setting context._sent for legacy support of Babel's
            // function.sent implementation.
            context.sent = context._sent = context.arg;

          } else if (context.method === "throw") {
            if (state === GenStateSuspendedStart) {
              state = GenStateCompleted;
              throw context.arg;
            }

            context.dispatchException(context.arg);

          } else if (context.method === "return") {
            context.abrupt("return", context.arg);
          }

          state = GenStateExecuting;

          var record = tryCatch(innerFn, self, context);
          if (record.type === "normal") {
            // If an exception is thrown from innerFn, we leave state ===
            // GenStateExecuting and loop back for another invocation.
            state = context.done
              ? GenStateCompleted
              : GenStateSuspendedYield;

            if (record.arg === ContinueSentinel) {
              continue;
            }

            return {
              value: record.arg,
              done: context.done
            };

          } else if (record.type === "throw") {
            state = GenStateCompleted;
            // Dispatch the exception by looping back around to the
            // context.dispatchException(context.arg) call above.
            context.method = "throw";
            context.arg = record.arg;
          }
        }
      };
    }

    // Call delegate.iterator[context.method](context.arg) and handle the
    // result, either by returning a { value, done } result from the
    // delegate iterator, or by modifying context.method and context.arg,
    // setting context.delegate to null, and returning the ContinueSentinel.
    function maybeInvokeDelegate(delegate, context) {
      var method = delegate.iterator[context.method];
      if (method === undefined$1) {
        // A .throw or .return when the delegate iterator has no .throw
        // method always terminates the yield* loop.
        context.delegate = null;

        if (context.method === "throw") {
          // Note: ["return"] must be used for ES3 parsing compatibility.
          if (delegate.iterator["return"]) {
            // If the delegate iterator has a return method, give it a
            // chance to clean up.
            context.method = "return";
            context.arg = undefined$1;
            maybeInvokeDelegate(delegate, context);

            if (context.method === "throw") {
              // If maybeInvokeDelegate(context) changed context.method from
              // "return" to "throw", let that override the TypeError below.
              return ContinueSentinel;
            }
          }

          context.method = "throw";
          context.arg = new TypeError(
            "The iterator does not provide a 'throw' method");
        }

        return ContinueSentinel;
      }

      var record = tryCatch(method, delegate.iterator, context.arg);

      if (record.type === "throw") {
        context.method = "throw";
        context.arg = record.arg;
        context.delegate = null;
        return ContinueSentinel;
      }

      var info = record.arg;

      if (! info) {
        context.method = "throw";
        context.arg = new TypeError("iterator result is not an object");
        context.delegate = null;
        return ContinueSentinel;
      }

      if (info.done) {
        // Assign the result of the finished delegate to the temporary
        // variable specified by delegate.resultName (see delegateYield).
        context[delegate.resultName] = info.value;

        // Resume execution at the desired location (see delegateYield).
        context.next = delegate.nextLoc;

        // If context.method was "throw" but the delegate handled the
        // exception, let the outer generator proceed normally. If
        // context.method was "next", forget context.arg since it has been
        // "consumed" by the delegate iterator. If context.method was
        // "return", allow the original .return call to continue in the
        // outer generator.
        if (context.method !== "return") {
          context.method = "next";
          context.arg = undefined$1;
        }

      } else {
        // Re-yield the result returned by the delegate method.
        return info;
      }

      // The delegate iterator is finished, so forget it and continue with
      // the outer generator.
      context.delegate = null;
      return ContinueSentinel;
    }

    // Define Generator.prototype.{next,throw,return} in terms of the
    // unified ._invoke helper method.
    defineIteratorMethods(Gp);

    define(Gp, toStringTagSymbol, "Generator");

    // A Generator should always return itself as the iterator object when the
    // @@iterator function is called on it. Some browsers' implementations of the
    // iterator prototype chain incorrectly implement this, causing the Generator
    // object to not be returned from this call. This ensures that doesn't happen.
    // See https://github.com/facebook/regenerator/issues/274 for more details.
    define(Gp, iteratorSymbol, function() {
      return this;
    });

    define(Gp, "toString", function() {
      return "[object Generator]";
    });

    function pushTryEntry(locs) {
      var entry = { tryLoc: locs[0] };

      if (1 in locs) {
        entry.catchLoc = locs[1];
      }

      if (2 in locs) {
        entry.finallyLoc = locs[2];
        entry.afterLoc = locs[3];
      }

      this.tryEntries.push(entry);
    }

    function resetTryEntry(entry) {
      var record = entry.completion || {};
      record.type = "normal";
      delete record.arg;
      entry.completion = record;
    }

    function Context(tryLocsList) {
      // The root entry object (effectively a try statement without a catch
      // or a finally block) gives us a place to store values thrown from
      // locations where there is no enclosing try statement.
      this.tryEntries = [{ tryLoc: "root" }];
      tryLocsList.forEach(pushTryEntry, this);
      this.reset(true);
    }

    exports.keys = function(object) {
      var keys = [];
      for (var key in object) {
        keys.push(key);
      }
      keys.reverse();

      // Rather than returning an object with a next method, we keep
      // things simple and return the next function itself.
      return function next() {
        while (keys.length) {
          var key = keys.pop();
          if (key in object) {
            next.value = key;
            next.done = false;
            return next;
          }
        }

        // To avoid creating an additional object, we just hang the .value
        // and .done properties off the next function object itself. This
        // also ensures that the minifier will not anonymize the function.
        next.done = true;
        return next;
      };
    };

    function values(iterable) {
      if (iterable) {
        var iteratorMethod = iterable[iteratorSymbol];
        if (iteratorMethod) {
          return iteratorMethod.call(iterable);
        }

        if (typeof iterable.next === "function") {
          return iterable;
        }

        if (!isNaN(iterable.length)) {
          var i = -1, next = function next() {
            while (++i < iterable.length) {
              if (hasOwn.call(iterable, i)) {
                next.value = iterable[i];
                next.done = false;
                return next;
              }
            }

            next.value = undefined$1;
            next.done = true;

            return next;
          };

          return next.next = next;
        }
      }

      // Return an iterator with no values.
      return { next: doneResult };
    }
    exports.values = values;

    function doneResult() {
      return { value: undefined$1, done: true };
    }

    Context.prototype = {
      constructor: Context,

      reset: function(skipTempReset) {
        this.prev = 0;
        this.next = 0;
        // Resetting context._sent for legacy support of Babel's
        // function.sent implementation.
        this.sent = this._sent = undefined$1;
        this.done = false;
        this.delegate = null;

        this.method = "next";
        this.arg = undefined$1;

        this.tryEntries.forEach(resetTryEntry);

        if (!skipTempReset) {
          for (var name in this) {
            // Not sure about the optimal order of these conditions:
            if (name.charAt(0) === "t" &&
                hasOwn.call(this, name) &&
                !isNaN(+name.slice(1))) {
              this[name] = undefined$1;
            }
          }
        }
      },

      stop: function() {
        this.done = true;

        var rootEntry = this.tryEntries[0];
        var rootRecord = rootEntry.completion;
        if (rootRecord.type === "throw") {
          throw rootRecord.arg;
        }

        return this.rval;
      },

      dispatchException: function(exception) {
        if (this.done) {
          throw exception;
        }

        var context = this;
        function handle(loc, caught) {
          record.type = "throw";
          record.arg = exception;
          context.next = loc;

          if (caught) {
            // If the dispatched exception was caught by a catch block,
            // then let that catch block handle the exception normally.
            context.method = "next";
            context.arg = undefined$1;
          }

          return !! caught;
        }

        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          var record = entry.completion;

          if (entry.tryLoc === "root") {
            // Exception thrown outside of any try block that could handle
            // it, so set the completion value of the entire function to
            // throw the exception.
            return handle("end");
          }

          if (entry.tryLoc <= this.prev) {
            var hasCatch = hasOwn.call(entry, "catchLoc");
            var hasFinally = hasOwn.call(entry, "finallyLoc");

            if (hasCatch && hasFinally) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              } else if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }

            } else if (hasCatch) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              }

            } else if (hasFinally) {
              if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }

            } else {
              throw new Error("try statement without catch or finally");
            }
          }
        }
      },

      abrupt: function(type, arg) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.tryLoc <= this.prev &&
              hasOwn.call(entry, "finallyLoc") &&
              this.prev < entry.finallyLoc) {
            var finallyEntry = entry;
            break;
          }
        }

        if (finallyEntry &&
            (type === "break" ||
             type === "continue") &&
            finallyEntry.tryLoc <= arg &&
            arg <= finallyEntry.finallyLoc) {
          // Ignore the finally entry if control is not jumping to a
          // location outside the try/catch block.
          finallyEntry = null;
        }

        var record = finallyEntry ? finallyEntry.completion : {};
        record.type = type;
        record.arg = arg;

        if (finallyEntry) {
          this.method = "next";
          this.next = finallyEntry.finallyLoc;
          return ContinueSentinel;
        }

        return this.complete(record);
      },

      complete: function(record, afterLoc) {
        if (record.type === "throw") {
          throw record.arg;
        }

        if (record.type === "break" ||
            record.type === "continue") {
          this.next = record.arg;
        } else if (record.type === "return") {
          this.rval = this.arg = record.arg;
          this.method = "return";
          this.next = "end";
        } else if (record.type === "normal" && afterLoc) {
          this.next = afterLoc;
        }

        return ContinueSentinel;
      },

      finish: function(finallyLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.finallyLoc === finallyLoc) {
            this.complete(entry.completion, entry.afterLoc);
            resetTryEntry(entry);
            return ContinueSentinel;
          }
        }
      },

      "catch": function(tryLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.tryLoc === tryLoc) {
            var record = entry.completion;
            if (record.type === "throw") {
              var thrown = record.arg;
              resetTryEntry(entry);
            }
            return thrown;
          }
        }

        // The context.catch method must only be called with a location
        // argument that corresponds to a known catch block.
        throw new Error("illegal catch attempt");
      },

      delegateYield: function(iterable, resultName, nextLoc) {
        this.delegate = {
          iterator: values(iterable),
          resultName: resultName,
          nextLoc: nextLoc
        };

        if (this.method === "next") {
          // Deliberately forget the last sent value so that we don't
          // accidentally pass it on to the delegate.
          this.arg = undefined$1;
        }

        return ContinueSentinel;
      }
    };

    // Regardless of whether this script is executing as a CommonJS module
    // or not, return the runtime object so that we can declare the variable
    // regeneratorRuntime in the outer scope, which allows this module to be
    // injected easily by `bin/regenerator --include-runtime script.js`.
    return exports;

  }(
    // If this script is executing as a CommonJS module, use module.exports
    // as the regeneratorRuntime namespace. Otherwise create a new empty
    // object. Either way, the resulting object will be used to initialize
    // the regeneratorRuntime variable at the top of this file.
    module.exports 
  ));

  try {
    regeneratorRuntime = runtime;
  } catch (accidentalStrictMode) {
    // This module should not be running in strict mode, so the above
    // assignment should always work unless something is misconfigured. Just
    // in case runtime.js accidentally runs in strict mode, in modern engines
    // we can explicitly access globalThis. In older engines we can escape
    // strict mode using a global Function call. This could conceivably fail
    // if a Content Security Policy forbids using Function, but in that case
    // the proper solution is to fix the accidental strict mode problem. If
    // you've misconfigured your bundler to force strict mode and applied a
    // CSP to forbid Function, and you're not willing to fix either of those
    // problems, please detail your unique predicament in a GitHub issue.
    if (typeof globalThis === "object") {
      globalThis.regeneratorRuntime = runtime;
    } else {
      Function("r", "regeneratorRuntime = r")(runtime);
    }
  }
  });

  var regenerator = runtime_1;

  function _extends() {
    _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends.apply(this, arguments);
  }

  function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$1(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

  var AppCall = /*#__PURE__*/function () {
    function AppCall(muon, app) {
      _classCallCheck(this, AppCall);

      this.muon = muon;
      this.app = app;
    }

    _createClass(AppCall, [{
      key: "method",
      value: function method(_method, _ref) {
        var params = _extends({}, _ref);

        this.data = {
          app: this.app,
          method: _method,
          params: _objectSpread$1({}, params),
          nSign: this.muon.nSign
        };
        return this;
      }
    }, {
      key: "call",
      value: function call() {
        return this.muon.request(this.data);
      }
    }]);

    return AppCall;
  }();

  var bind = function bind(fn, thisArg) {
    return function wrap() {
      var args = new Array(arguments.length);
      for (var i = 0; i < args.length; i++) {
        args[i] = arguments[i];
      }
      return fn.apply(thisArg, args);
    };
  };

  /*global toString:true*/

  // utils is a library of generic helper functions non-specific to axios

  var toString$1 = Object.prototype.toString;

  /**
   * Determine if a value is an Array
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is an Array, otherwise false
   */
  function isArray$3(val) {
    return toString$1.call(val) === '[object Array]';
  }

  /**
   * Determine if a value is undefined
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if the value is undefined, otherwise false
   */
  function isUndefined$1(val) {
    return typeof val === 'undefined';
  }

  /**
   * Determine if a value is a Buffer
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a Buffer, otherwise false
   */
  function isBuffer$2(val) {
    return val !== null && !isUndefined$1(val) && val.constructor !== null && !isUndefined$1(val.constructor)
      && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
  }

  /**
   * Determine if a value is an ArrayBuffer
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is an ArrayBuffer, otherwise false
   */
  function isArrayBuffer(val) {
    return toString$1.call(val) === '[object ArrayBuffer]';
  }

  /**
   * Determine if a value is a FormData
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is an FormData, otherwise false
   */
  function isFormData(val) {
    return (typeof FormData !== 'undefined') && (val instanceof FormData);
  }

  /**
   * Determine if a value is a view on an ArrayBuffer
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
   */
  function isArrayBufferView(val) {
    var result;
    if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
      result = ArrayBuffer.isView(val);
    } else {
      result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
    }
    return result;
  }

  /**
   * Determine if a value is a String
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a String, otherwise false
   */
  function isString$1(val) {
    return typeof val === 'string';
  }

  /**
   * Determine if a value is a Number
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a Number, otherwise false
   */
  function isNumber$1(val) {
    return typeof val === 'number';
  }

  /**
   * Determine if a value is an Object
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is an Object, otherwise false
   */
  function isObject$1(val) {
    return val !== null && typeof val === 'object';
  }

  /**
   * Determine if a value is a plain Object
   *
   * @param {Object} val The value to test
   * @return {boolean} True if value is a plain Object, otherwise false
   */
  function isPlainObject(val) {
    if (toString$1.call(val) !== '[object Object]') {
      return false;
    }

    var prototype = Object.getPrototypeOf(val);
    return prototype === null || prototype === Object.prototype;
  }

  /**
   * Determine if a value is a Date
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a Date, otherwise false
   */
  function isDate$1(val) {
    return toString$1.call(val) === '[object Date]';
  }

  /**
   * Determine if a value is a File
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a File, otherwise false
   */
  function isFile(val) {
    return toString$1.call(val) === '[object File]';
  }

  /**
   * Determine if a value is a Blob
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a Blob, otherwise false
   */
  function isBlob(val) {
    return toString$1.call(val) === '[object Blob]';
  }

  /**
   * Determine if a value is a Function
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a Function, otherwise false
   */
  function isFunction$2(val) {
    return toString$1.call(val) === '[object Function]';
  }

  /**
   * Determine if a value is a Stream
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a Stream, otherwise false
   */
  function isStream(val) {
    return isObject$1(val) && isFunction$2(val.pipe);
  }

  /**
   * Determine if a value is a URLSearchParams object
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a URLSearchParams object, otherwise false
   */
  function isURLSearchParams(val) {
    return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
  }

  /**
   * Trim excess whitespace off the beginning and end of a string
   *
   * @param {String} str The String to trim
   * @returns {String} The String freed of excess whitespace
   */
  function trim(str) {
    return str.replace(/^\s*/, '').replace(/\s*$/, '');
  }

  /**
   * Determine if we're running in a standard browser environment
   *
   * This allows axios to run in a web worker, and react-native.
   * Both environments support XMLHttpRequest, but not fully standard globals.
   *
   * web workers:
   *  typeof window -> undefined
   *  typeof document -> undefined
   *
   * react-native:
   *  navigator.product -> 'ReactNative'
   * nativescript
   *  navigator.product -> 'NativeScript' or 'NS'
   */
  function isStandardBrowserEnv() {
    if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||
                                             navigator.product === 'NativeScript' ||
                                             navigator.product === 'NS')) {
      return false;
    }
    return (
      typeof window !== 'undefined' &&
      typeof document !== 'undefined'
    );
  }

  /**
   * Iterate over an Array or an Object invoking a function for each item.
   *
   * If `obj` is an Array callback will be called passing
   * the value, index, and complete array for each item.
   *
   * If 'obj' is an Object callback will be called passing
   * the value, key, and complete object for each property.
   *
   * @param {Object|Array} obj The object to iterate
   * @param {Function} fn The callback to invoke for each item
   */
  function forEach$1(obj, fn) {
    // Don't bother if no value provided
    if (obj === null || typeof obj === 'undefined') {
      return;
    }

    // Force an array if not already something iterable
    if (typeof obj !== 'object') {
      /*eslint no-param-reassign:0*/
      obj = [obj];
    }

    if (isArray$3(obj)) {
      // Iterate over array values
      for (var i = 0, l = obj.length; i < l; i++) {
        fn.call(null, obj[i], i, obj);
      }
    } else {
      // Iterate over object keys
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          fn.call(null, obj[key], key, obj);
        }
      }
    }
  }

  /**
   * Accepts varargs expecting each argument to be an object, then
   * immutably merges the properties of each object and returns result.
   *
   * When multiple objects contain the same key the later object in
   * the arguments list will take precedence.
   *
   * Example:
   *
   * ```js
   * var result = merge({foo: 123}, {foo: 456});
   * console.log(result.foo); // outputs 456
   * ```
   *
   * @param {Object} obj1 Object to merge
   * @returns {Object} Result of all merge properties
   */
  function merge(/* obj1, obj2, obj3, ... */) {
    var result = {};
    function assignValue(val, key) {
      if (isPlainObject(result[key]) && isPlainObject(val)) {
        result[key] = merge(result[key], val);
      } else if (isPlainObject(val)) {
        result[key] = merge({}, val);
      } else if (isArray$3(val)) {
        result[key] = val.slice();
      } else {
        result[key] = val;
      }
    }

    for (var i = 0, l = arguments.length; i < l; i++) {
      forEach$1(arguments[i], assignValue);
    }
    return result;
  }

  /**
   * Extends object a by mutably adding to it the properties of object b.
   *
   * @param {Object} a The object to be extended
   * @param {Object} b The object to copy properties from
   * @param {Object} thisArg The object to bind function to
   * @return {Object} The resulting value of object a
   */
  function extend(a, b, thisArg) {
    forEach$1(b, function assignValue(val, key) {
      if (thisArg && typeof val === 'function') {
        a[key] = bind(val, thisArg);
      } else {
        a[key] = val;
      }
    });
    return a;
  }

  /**
   * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
   *
   * @param {string} content with BOM
   * @return {string} content value without BOM
   */
  function stripBOM(content) {
    if (content.charCodeAt(0) === 0xFEFF) {
      content = content.slice(1);
    }
    return content;
  }

  var utils = {
    isArray: isArray$3,
    isArrayBuffer: isArrayBuffer,
    isBuffer: isBuffer$2,
    isFormData: isFormData,
    isArrayBufferView: isArrayBufferView,
    isString: isString$1,
    isNumber: isNumber$1,
    isObject: isObject$1,
    isPlainObject: isPlainObject,
    isUndefined: isUndefined$1,
    isDate: isDate$1,
    isFile: isFile,
    isBlob: isBlob,
    isFunction: isFunction$2,
    isStream: isStream,
    isURLSearchParams: isURLSearchParams,
    isStandardBrowserEnv: isStandardBrowserEnv,
    forEach: forEach$1,
    merge: merge,
    extend: extend,
    trim: trim,
    stripBOM: stripBOM
  };

  function encode$1(val) {
    return encodeURIComponent(val).
      replace(/%3A/gi, ':').
      replace(/%24/g, '$').
      replace(/%2C/gi, ',').
      replace(/%20/g, '+').
      replace(/%5B/gi, '[').
      replace(/%5D/gi, ']');
  }

  /**
   * Build a URL by appending params to the end
   *
   * @param {string} url The base of the url (e.g., http://www.google.com)
   * @param {object} [params] The params to be appended
   * @returns {string} The formatted url
   */
  var buildURL = function buildURL(url, params, paramsSerializer) {
    /*eslint no-param-reassign:0*/
    if (!params) {
      return url;
    }

    var serializedParams;
    if (paramsSerializer) {
      serializedParams = paramsSerializer(params);
    } else if (utils.isURLSearchParams(params)) {
      serializedParams = params.toString();
    } else {
      var parts = [];

      utils.forEach(params, function serialize(val, key) {
        if (val === null || typeof val === 'undefined') {
          return;
        }

        if (utils.isArray(val)) {
          key = key + '[]';
        } else {
          val = [val];
        }

        utils.forEach(val, function parseValue(v) {
          if (utils.isDate(v)) {
            v = v.toISOString();
          } else if (utils.isObject(v)) {
            v = JSON.stringify(v);
          }
          parts.push(encode$1(key) + '=' + encode$1(v));
        });
      });

      serializedParams = parts.join('&');
    }

    if (serializedParams) {
      var hashmarkIndex = url.indexOf('#');
      if (hashmarkIndex !== -1) {
        url = url.slice(0, hashmarkIndex);
      }

      url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
    }

    return url;
  };

  function InterceptorManager() {
    this.handlers = [];
  }

  /**
   * Add a new interceptor to the stack
   *
   * @param {Function} fulfilled The function to handle `then` for a `Promise`
   * @param {Function} rejected The function to handle `reject` for a `Promise`
   *
   * @return {Number} An ID used to remove interceptor later
   */
  InterceptorManager.prototype.use = function use(fulfilled, rejected) {
    this.handlers.push({
      fulfilled: fulfilled,
      rejected: rejected
    });
    return this.handlers.length - 1;
  };

  /**
   * Remove an interceptor from the stack
   *
   * @param {Number} id The ID that was returned by `use`
   */
  InterceptorManager.prototype.eject = function eject(id) {
    if (this.handlers[id]) {
      this.handlers[id] = null;
    }
  };

  /**
   * Iterate over all the registered interceptors
   *
   * This method is particularly useful for skipping over any
   * interceptors that may have become `null` calling `eject`.
   *
   * @param {Function} fn The function to call for each interceptor
   */
  InterceptorManager.prototype.forEach = function forEach(fn) {
    utils.forEach(this.handlers, function forEachHandler(h) {
      if (h !== null) {
        fn(h);
      }
    });
  };

  var InterceptorManager_1 = InterceptorManager;

  /**
   * Transform the data for a request or a response
   *
   * @param {Object|String} data The data to be transformed
   * @param {Array} headers The headers for the request or response
   * @param {Array|Function} fns A single function or Array of functions
   * @returns {*} The resulting transformed data
   */
  var transformData = function transformData(data, headers, fns) {
    /*eslint no-param-reassign:0*/
    utils.forEach(fns, function transform(fn) {
      data = fn(data, headers);
    });

    return data;
  };

  var isCancel = function isCancel(value) {
    return !!(value && value.__CANCEL__);
  };

  var global$1 = (typeof global !== "undefined" ? global :
    typeof self !== "undefined" ? self :
    typeof window !== "undefined" ? window : {});

  // shim for using process in browser
  // based off https://github.com/defunctzombie/node-process/blob/master/browser.js

  function defaultSetTimout() {
      throw new Error('setTimeout has not been defined');
  }
  function defaultClearTimeout () {
      throw new Error('clearTimeout has not been defined');
  }
  var cachedSetTimeout = defaultSetTimout;
  var cachedClearTimeout = defaultClearTimeout;
  if (typeof global$1.setTimeout === 'function') {
      cachedSetTimeout = setTimeout;
  }
  if (typeof global$1.clearTimeout === 'function') {
      cachedClearTimeout = clearTimeout;
  }

  function runTimeout(fun) {
      if (cachedSetTimeout === setTimeout) {
          //normal enviroments in sane situations
          return setTimeout(fun, 0);
      }
      // if setTimeout wasn't available but was latter defined
      if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
          cachedSetTimeout = setTimeout;
          return setTimeout(fun, 0);
      }
      try {
          // when when somebody has screwed with setTimeout but no I.E. maddness
          return cachedSetTimeout(fun, 0);
      } catch(e){
          try {
              // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
              return cachedSetTimeout.call(null, fun, 0);
          } catch(e){
              // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
              return cachedSetTimeout.call(this, fun, 0);
          }
      }


  }
  function runClearTimeout(marker) {
      if (cachedClearTimeout === clearTimeout) {
          //normal enviroments in sane situations
          return clearTimeout(marker);
      }
      // if clearTimeout wasn't available but was latter defined
      if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
          cachedClearTimeout = clearTimeout;
          return clearTimeout(marker);
      }
      try {
          // when when somebody has screwed with setTimeout but no I.E. maddness
          return cachedClearTimeout(marker);
      } catch (e){
          try {
              // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
              return cachedClearTimeout.call(null, marker);
          } catch (e){
              // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
              // Some versions of I.E. have different rules for clearTimeout vs setTimeout
              return cachedClearTimeout.call(this, marker);
          }
      }



  }
  var queue = [];
  var draining = false;
  var currentQueue;
  var queueIndex = -1;

  function cleanUpNextTick() {
      if (!draining || !currentQueue) {
          return;
      }
      draining = false;
      if (currentQueue.length) {
          queue = currentQueue.concat(queue);
      } else {
          queueIndex = -1;
      }
      if (queue.length) {
          drainQueue();
      }
  }

  function drainQueue() {
      if (draining) {
          return;
      }
      var timeout = runTimeout(cleanUpNextTick);
      draining = true;

      var len = queue.length;
      while(len) {
          currentQueue = queue;
          queue = [];
          while (++queueIndex < len) {
              if (currentQueue) {
                  currentQueue[queueIndex].run();
              }
          }
          queueIndex = -1;
          len = queue.length;
      }
      currentQueue = null;
      draining = false;
      runClearTimeout(timeout);
  }
  function nextTick(fun) {
      var args = new Array(arguments.length - 1);
      if (arguments.length > 1) {
          for (var i = 1; i < arguments.length; i++) {
              args[i - 1] = arguments[i];
          }
      }
      queue.push(new Item(fun, args));
      if (queue.length === 1 && !draining) {
          runTimeout(drainQueue);
      }
  }
  // v8 likes predictible objects
  function Item(fun, array) {
      this.fun = fun;
      this.array = array;
  }
  Item.prototype.run = function () {
      this.fun.apply(null, this.array);
  };
  var title = 'browser';
  var platform$1 = 'browser';
  var browser$2 = true;
  var env$1 = {};
  var argv = [];
  var version$1 = ''; // empty string to avoid regexp issues
  var versions = {};
  var release$1 = {};
  var config = {};

  function noop$1() {}

  var on = noop$1;
  var addListener = noop$1;
  var once = noop$1;
  var off = noop$1;
  var removeListener = noop$1;
  var removeAllListeners = noop$1;
  var emit = noop$1;

  function binding$1(name) {
      throw new Error('process.binding is not supported');
  }

  function cwd () { return '/' }
  function chdir (dir) {
      throw new Error('process.chdir is not supported');
  }function umask() { return 0; }

  // from https://github.com/kumavis/browser-process-hrtime/blob/master/index.js
  var performance = global$1.performance || {};
  var performanceNow =
    performance.now        ||
    performance.mozNow     ||
    performance.msNow      ||
    performance.oNow       ||
    performance.webkitNow  ||
    function(){ return (new Date()).getTime() };

  // generate timestamp or delta
  // see http://nodejs.org/api/process.html#process_process_hrtime
  function hrtime(previousTimestamp){
    var clocktime = performanceNow.call(performance)*1e-3;
    var seconds = Math.floor(clocktime);
    var nanoseconds = Math.floor((clocktime%1)*1e9);
    if (previousTimestamp) {
      seconds = seconds - previousTimestamp[0];
      nanoseconds = nanoseconds - previousTimestamp[1];
      if (nanoseconds<0) {
        seconds--;
        nanoseconds += 1e9;
      }
    }
    return [seconds,nanoseconds]
  }

  var startTime = new Date();
  function uptime$1() {
    var currentTime = new Date();
    var dif = currentTime - startTime;
    return dif / 1000;
  }

  var browser$1$1 = {
    nextTick: nextTick,
    title: title,
    browser: browser$2,
    env: env$1,
    argv: argv,
    version: version$1,
    versions: versions,
    on: on,
    addListener: addListener,
    once: once,
    off: off,
    removeListener: removeListener,
    removeAllListeners: removeAllListeners,
    emit: emit,
    binding: binding$1,
    cwd: cwd,
    chdir: chdir,
    umask: umask,
    hrtime: hrtime,
    platform: platform$1,
    release: release$1,
    config: config,
    uptime: uptime$1
  };

  var process = browser$1$1;

  var normalizeHeaderName = function normalizeHeaderName(headers, normalizedName) {
    utils.forEach(headers, function processHeader(value, name) {
      if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
        headers[normalizedName] = value;
        delete headers[name];
      }
    });
  };

  /**
   * Update an Error with the specified config, error code, and response.
   *
   * @param {Error} error The error to update.
   * @param {Object} config The config.
   * @param {string} [code] The error code (for example, 'ECONNABORTED').
   * @param {Object} [request] The request.
   * @param {Object} [response] The response.
   * @returns {Error} The error.
   */
  var enhanceError = function enhanceError(error, config, code, request, response) {
    error.config = config;
    if (code) {
      error.code = code;
    }

    error.request = request;
    error.response = response;
    error.isAxiosError = true;

    error.toJSON = function toJSON() {
      return {
        // Standard
        message: this.message,
        name: this.name,
        // Microsoft
        description: this.description,
        number: this.number,
        // Mozilla
        fileName: this.fileName,
        lineNumber: this.lineNumber,
        columnNumber: this.columnNumber,
        stack: this.stack,
        // Axios
        config: this.config,
        code: this.code
      };
    };
    return error;
  };

  /**
   * Create an Error with the specified message, config, error code, request and response.
   *
   * @param {string} message The error message.
   * @param {Object} config The config.
   * @param {string} [code] The error code (for example, 'ECONNABORTED').
   * @param {Object} [request] The request.
   * @param {Object} [response] The response.
   * @returns {Error} The created error.
   */
  var createError = function createError(message, config, code, request, response) {
    var error = new Error(message);
    return enhanceError(error, config, code, request, response);
  };

  /**
   * Resolve or reject a Promise based on response status.
   *
   * @param {Function} resolve A function that resolves the promise.
   * @param {Function} reject A function that rejects the promise.
   * @param {object} response The response.
   */
  var settle = function settle(resolve, reject, response) {
    var validateStatus = response.config.validateStatus;
    if (!response.status || !validateStatus || validateStatus(response.status)) {
      resolve(response);
    } else {
      reject(createError(
        'Request failed with status code ' + response.status,
        response.config,
        null,
        response.request,
        response
      ));
    }
  };

  var cookies = (
    utils.isStandardBrowserEnv() ?

    // Standard browser envs support document.cookie
      (function standardBrowserEnv() {
        return {
          write: function write(name, value, expires, path, domain, secure) {
            var cookie = [];
            cookie.push(name + '=' + encodeURIComponent(value));

            if (utils.isNumber(expires)) {
              cookie.push('expires=' + new Date(expires).toGMTString());
            }

            if (utils.isString(path)) {
              cookie.push('path=' + path);
            }

            if (utils.isString(domain)) {
              cookie.push('domain=' + domain);
            }

            if (secure === true) {
              cookie.push('secure');
            }

            document.cookie = cookie.join('; ');
          },

          read: function read(name) {
            var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
            return (match ? decodeURIComponent(match[3]) : null);
          },

          remove: function remove(name) {
            this.write(name, '', Date.now() - 86400000);
          }
        };
      })() :

    // Non standard browser env (web workers, react-native) lack needed support.
      (function nonStandardBrowserEnv() {
        return {
          write: function write() {},
          read: function read() { return null; },
          remove: function remove() {}
        };
      })()
  );

  /**
   * Determines whether the specified URL is absolute
   *
   * @param {string} url The URL to test
   * @returns {boolean} True if the specified URL is absolute, otherwise false
   */
  var isAbsoluteURL = function isAbsoluteURL(url) {
    // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
    // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
    // by any combination of letters, digits, plus, period, or hyphen.
    return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
  };

  /**
   * Creates a new URL by combining the specified URLs
   *
   * @param {string} baseURL The base URL
   * @param {string} relativeURL The relative URL
   * @returns {string} The combined URL
   */
  var combineURLs = function combineURLs(baseURL, relativeURL) {
    return relativeURL
      ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
      : baseURL;
  };

  /**
   * Creates a new URL by combining the baseURL with the requestedURL,
   * only when the requestedURL is not already an absolute URL.
   * If the requestURL is absolute, this function returns the requestedURL untouched.
   *
   * @param {string} baseURL The base URL
   * @param {string} requestedURL Absolute or relative URL to combine
   * @returns {string} The combined full path
   */
  var buildFullPath = function buildFullPath(baseURL, requestedURL) {
    if (baseURL && !isAbsoluteURL(requestedURL)) {
      return combineURLs(baseURL, requestedURL);
    }
    return requestedURL;
  };

  // Headers whose duplicates are ignored by node
  // c.f. https://nodejs.org/api/http.html#http_message_headers
  var ignoreDuplicateOf = [
    'age', 'authorization', 'content-length', 'content-type', 'etag',
    'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
    'last-modified', 'location', 'max-forwards', 'proxy-authorization',
    'referer', 'retry-after', 'user-agent'
  ];

  /**
   * Parse headers into an object
   *
   * ```
   * Date: Wed, 27 Aug 2014 08:58:49 GMT
   * Content-Type: application/json
   * Connection: keep-alive
   * Transfer-Encoding: chunked
   * ```
   *
   * @param {String} headers Headers needing to be parsed
   * @returns {Object} Headers parsed into an object
   */
  var parseHeaders = function parseHeaders(headers) {
    var parsed = {};
    var key;
    var val;
    var i;

    if (!headers) { return parsed; }

    utils.forEach(headers.split('\n'), function parser(line) {
      i = line.indexOf(':');
      key = utils.trim(line.substr(0, i)).toLowerCase();
      val = utils.trim(line.substr(i + 1));

      if (key) {
        if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
          return;
        }
        if (key === 'set-cookie') {
          parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
        } else {
          parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
        }
      }
    });

    return parsed;
  };

  var isURLSameOrigin = (
    utils.isStandardBrowserEnv() ?

    // Standard browser envs have full support of the APIs needed to test
    // whether the request URL is of the same origin as current location.
      (function standardBrowserEnv() {
        var msie = /(msie|trident)/i.test(navigator.userAgent);
        var urlParsingNode = document.createElement('a');
        var originURL;

        /**
      * Parse a URL to discover it's components
      *
      * @param {String} url The URL to be parsed
      * @returns {Object}
      */
        function resolveURL(url) {
          var href = url;

          if (msie) {
          // IE needs attribute set twice to normalize properties
            urlParsingNode.setAttribute('href', href);
            href = urlParsingNode.href;
          }

          urlParsingNode.setAttribute('href', href);

          // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
          return {
            href: urlParsingNode.href,
            protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
            host: urlParsingNode.host,
            search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
            hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
            hostname: urlParsingNode.hostname,
            port: urlParsingNode.port,
            pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
              urlParsingNode.pathname :
              '/' + urlParsingNode.pathname
          };
        }

        originURL = resolveURL(window.location.href);

        /**
      * Determine if a URL shares the same origin as the current location
      *
      * @param {String} requestURL The URL to test
      * @returns {boolean} True if URL shares the same origin, otherwise false
      */
        return function isURLSameOrigin(requestURL) {
          var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
          return (parsed.protocol === originURL.protocol &&
              parsed.host === originURL.host);
        };
      })() :

    // Non standard browser envs (web workers, react-native) lack needed support.
      (function nonStandardBrowserEnv() {
        return function isURLSameOrigin() {
          return true;
        };
      })()
  );

  var xhr$1 = function xhrAdapter(config) {
    return new Promise(function dispatchXhrRequest(resolve, reject) {
      var requestData = config.data;
      var requestHeaders = config.headers;

      if (utils.isFormData(requestData)) {
        delete requestHeaders['Content-Type']; // Let the browser set it
      }

      var request = new XMLHttpRequest();

      // HTTP basic authentication
      if (config.auth) {
        var username = config.auth.username || '';
        var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : '';
        requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
      }

      var fullPath = buildFullPath(config.baseURL, config.url);
      request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);

      // Set the request timeout in MS
      request.timeout = config.timeout;

      // Listen for ready state
      request.onreadystatechange = function handleLoad() {
        if (!request || request.readyState !== 4) {
          return;
        }

        // The request errored out and we didn't get a response, this will be
        // handled by onerror instead
        // With one exception: request that using file: protocol, most browsers
        // will return status as 0 even though it's a successful request
        if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
          return;
        }

        // Prepare the response
        var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
        var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
        var response = {
          data: responseData,
          status: request.status,
          statusText: request.statusText,
          headers: responseHeaders,
          config: config,
          request: request
        };

        settle(resolve, reject, response);

        // Clean up request
        request = null;
      };

      // Handle browser request cancellation (as opposed to a manual cancellation)
      request.onabort = function handleAbort() {
        if (!request) {
          return;
        }

        reject(createError('Request aborted', config, 'ECONNABORTED', request));

        // Clean up request
        request = null;
      };

      // Handle low level network errors
      request.onerror = function handleError() {
        // Real errors are hidden from us by the browser
        // onerror should only fire if it's a network error
        reject(createError('Network Error', config, null, request));

        // Clean up request
        request = null;
      };

      // Handle timeout
      request.ontimeout = function handleTimeout() {
        var timeoutErrorMessage = 'timeout of ' + config.timeout + 'ms exceeded';
        if (config.timeoutErrorMessage) {
          timeoutErrorMessage = config.timeoutErrorMessage;
        }
        reject(createError(timeoutErrorMessage, config, 'ECONNABORTED',
          request));

        // Clean up request
        request = null;
      };

      // Add xsrf header
      // This is only done if running in a standard browser environment.
      // Specifically not if we're in a web worker, or react-native.
      if (utils.isStandardBrowserEnv()) {
        // Add xsrf header
        var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ?
          cookies.read(config.xsrfCookieName) :
          undefined;

        if (xsrfValue) {
          requestHeaders[config.xsrfHeaderName] = xsrfValue;
        }
      }

      // Add headers to the request
      if ('setRequestHeader' in request) {
        utils.forEach(requestHeaders, function setRequestHeader(val, key) {
          if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
            // Remove Content-Type if data is undefined
            delete requestHeaders[key];
          } else {
            // Otherwise add header to the request
            request.setRequestHeader(key, val);
          }
        });
      }

      // Add withCredentials to request if needed
      if (!utils.isUndefined(config.withCredentials)) {
        request.withCredentials = !!config.withCredentials;
      }

      // Add responseType to request if needed
      if (config.responseType) {
        try {
          request.responseType = config.responseType;
        } catch (e) {
          // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
          // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
          if (config.responseType !== 'json') {
            throw e;
          }
        }
      }

      // Handle progress if needed
      if (typeof config.onDownloadProgress === 'function') {
        request.addEventListener('progress', config.onDownloadProgress);
      }

      // Not all browsers support upload events
      if (typeof config.onUploadProgress === 'function' && request.upload) {
        request.upload.addEventListener('progress', config.onUploadProgress);
      }

      if (config.cancelToken) {
        // Handle cancellation
        config.cancelToken.promise.then(function onCanceled(cancel) {
          if (!request) {
            return;
          }

          request.abort();
          reject(cancel);
          // Clean up request
          request = null;
        });
      }

      if (!requestData) {
        requestData = null;
      }

      // Send the request
      request.send(requestData);
    });
  };

  var lookup = [];
  var revLookup = [];
  var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array;
  var inited = false;
  function init () {
    inited = true;
    var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    for (var i = 0, len = code.length; i < len; ++i) {
      lookup[i] = code[i];
      revLookup[code.charCodeAt(i)] = i;
    }

    revLookup['-'.charCodeAt(0)] = 62;
    revLookup['_'.charCodeAt(0)] = 63;
  }

  function toByteArray (b64) {
    if (!inited) {
      init();
    }
    var i, j, l, tmp, placeHolders, arr;
    var len = b64.length;

    if (len % 4 > 0) {
      throw new Error('Invalid string. Length must be a multiple of 4')
    }

    // the number of equal signs (place holders)
    // if there are two placeholders, than the two characters before it
    // represent one byte
    // if there is only one, then the three characters before it represent 2 bytes
    // this is just a cheap hack to not do indexOf twice
    placeHolders = b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0;

    // base64 is 4/3 + up to two characters of the original data
    arr = new Arr(len * 3 / 4 - placeHolders);

    // if there are placeholders, only get up to the last complete 4 chars
    l = placeHolders > 0 ? len - 4 : len;

    var L = 0;

    for (i = 0, j = 0; i < l; i += 4, j += 3) {
      tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)];
      arr[L++] = (tmp >> 16) & 0xFF;
      arr[L++] = (tmp >> 8) & 0xFF;
      arr[L++] = tmp & 0xFF;
    }

    if (placeHolders === 2) {
      tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4);
      arr[L++] = tmp & 0xFF;
    } else if (placeHolders === 1) {
      tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2);
      arr[L++] = (tmp >> 8) & 0xFF;
      arr[L++] = tmp & 0xFF;
    }

    return arr
  }

  function tripletToBase64 (num) {
    return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
  }

  function encodeChunk (uint8, start, end) {
    var tmp;
    var output = [];
    for (var i = start; i < end; i += 3) {
      tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2]);
      output.push(tripletToBase64(tmp));
    }
    return output.join('')
  }

  function fromByteArray (uint8) {
    if (!inited) {
      init();
    }
    var tmp;
    var len = uint8.length;
    var extraBytes = len % 3; // if we have 1 byte left, pad 2 bytes
    var output = '';
    var parts = [];
    var maxChunkLength = 16383; // must be multiple of 3

    // go through the array every three bytes, we'll deal with trailing stuff later
    for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
      parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)));
    }

    // pad the end with zeros, but make sure to not forget the extra bytes
    if (extraBytes === 1) {
      tmp = uint8[len - 1];
      output += lookup[tmp >> 2];
      output += lookup[(tmp << 4) & 0x3F];
      output += '==';
    } else if (extraBytes === 2) {
      tmp = (uint8[len - 2] << 8) + (uint8[len - 1]);
      output += lookup[tmp >> 10];
      output += lookup[(tmp >> 4) & 0x3F];
      output += lookup[(tmp << 2) & 0x3F];
      output += '=';
    }

    parts.push(output);

    return parts.join('')
  }

  function read (buffer, offset, isLE, mLen, nBytes) {
    var e, m;
    var eLen = nBytes * 8 - mLen - 1;
    var eMax = (1 << eLen) - 1;
    var eBias = eMax >> 1;
    var nBits = -7;
    var i = isLE ? (nBytes - 1) : 0;
    var d = isLE ? -1 : 1;
    var s = buffer[offset + i];

    i += d;

    e = s & ((1 << (-nBits)) - 1);
    s >>= (-nBits);
    nBits += eLen;
    for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

    m = e & ((1 << (-nBits)) - 1);
    e >>= (-nBits);
    nBits += mLen;
    for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

    if (e === 0) {
      e = 1 - eBias;
    } else if (e === eMax) {
      return m ? NaN : ((s ? -1 : 1) * Infinity)
    } else {
      m = m + Math.pow(2, mLen);
      e = e - eBias;
    }
    return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
  }

  function write (buffer, value, offset, isLE, mLen, nBytes) {
    var e, m, c;
    var eLen = nBytes * 8 - mLen - 1;
    var eMax = (1 << eLen) - 1;
    var eBias = eMax >> 1;
    var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0);
    var i = isLE ? 0 : (nBytes - 1);
    var d = isLE ? 1 : -1;
    var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0;

    value = Math.abs(value);

    if (isNaN(value) || value === Infinity) {
      m = isNaN(value) ? 1 : 0;
      e = eMax;
    } else {
      e = Math.floor(Math.log(value) / Math.LN2);
      if (value * (c = Math.pow(2, -e)) < 1) {
        e--;
        c *= 2;
      }
      if (e + eBias >= 1) {
        value += rt / c;
      } else {
        value += rt * Math.pow(2, 1 - eBias);
      }
      if (value * c >= 2) {
        e++;
        c /= 2;
      }

      if (e + eBias >= eMax) {
        m = 0;
        e = eMax;
      } else if (e + eBias >= 1) {
        m = (value * c - 1) * Math.pow(2, mLen);
        e = e + eBias;
      } else {
        m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
        e = 0;
      }
    }

    for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

    e = (e << mLen) | m;
    eLen += mLen;
    for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

    buffer[offset + i - d] |= s * 128;
  }

  var toString = {}.toString;

  var isArray$2 = Array.isArray || function (arr) {
    return toString.call(arr) == '[object Array]';
  };

  /*!
   * The buffer module from node.js, for the browser.
   *
   * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
   * @license  MIT
   */

  var INSPECT_MAX_BYTES = 50;

  /**
   * If `Buffer.TYPED_ARRAY_SUPPORT`:
   *   === true    Use Uint8Array implementation (fastest)
   *   === false   Use Object implementation (most compatible, even IE6)
   *
   * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
   * Opera 11.6+, iOS 4.2+.
   *
   * Due to various browser bugs, sometimes the Object implementation will be used even
   * when the browser supports typed arrays.
   *
   * Note:
   *
   *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
   *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
   *
   *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
   *
   *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
   *     incorrect length in some situations.

   * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
   * get the Object implementation, which is slower but behaves correctly.
   */
  Buffer.TYPED_ARRAY_SUPPORT = global$1.TYPED_ARRAY_SUPPORT !== undefined
    ? global$1.TYPED_ARRAY_SUPPORT
    : true;

  function kMaxLength () {
    return Buffer.TYPED_ARRAY_SUPPORT
      ? 0x7fffffff
      : 0x3fffffff
  }

  function createBuffer (that, length) {
    if (kMaxLength() < length) {
      throw new RangeError('Invalid typed array length')
    }
    if (Buffer.TYPED_ARRAY_SUPPORT) {
      // Return an augmented `Uint8Array` instance, for best performance
      that = new Uint8Array(length);
      that.__proto__ = Buffer.prototype;
    } else {
      // Fallback: Return an object instance of the Buffer class
      if (that === null) {
        that = new Buffer(length);
      }
      that.length = length;
    }

    return that
  }

  /**
   * The Buffer constructor returns instances of `Uint8Array` that have their
   * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
   * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
   * and the `Uint8Array` methods. Square bracket notation works as expected -- it
   * returns a single octet.
   *
   * The `Uint8Array` prototype remains unmodified.
   */

  function Buffer (arg, encodingOrOffset, length) {
    if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
      return new Buffer(arg, encodingOrOffset, length)
    }

    // Common case.
    if (typeof arg === 'number') {
      if (typeof encodingOrOffset === 'string') {
        throw new Error(
          'If encoding is specified then the first argument must be a string'
        )
      }
      return allocUnsafe(this, arg)
    }
    return from(this, arg, encodingOrOffset, length)
  }

  Buffer.poolSize = 8192; // not used by this implementation

  // TODO: Legacy, not needed anymore. Remove in next major version.
  Buffer._augment = function (arr) {
    arr.__proto__ = Buffer.prototype;
    return arr
  };

  function from (that, value, encodingOrOffset, length) {
    if (typeof value === 'number') {
      throw new TypeError('"value" argument must not be a number')
    }

    if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
      return fromArrayBuffer(that, value, encodingOrOffset, length)
    }

    if (typeof value === 'string') {
      return fromString(that, value, encodingOrOffset)
    }

    return fromObject(that, value)
  }

  /**
   * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
   * if value is a number.
   * Buffer.from(str[, encoding])
   * Buffer.from(array)
   * Buffer.from(buffer)
   * Buffer.from(arrayBuffer[, byteOffset[, length]])
   **/
  Buffer.from = function (value, encodingOrOffset, length) {
    return from(null, value, encodingOrOffset, length)
  };

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    Buffer.prototype.__proto__ = Uint8Array.prototype;
    Buffer.__proto__ = Uint8Array;
  }

  function assertSize (size) {
    if (typeof size !== 'number') {
      throw new TypeError('"size" argument must be a number')
    } else if (size < 0) {
      throw new RangeError('"size" argument must not be negative')
    }
  }

  function alloc (that, size, fill, encoding) {
    assertSize(size);
    if (size <= 0) {
      return createBuffer(that, size)
    }
    if (fill !== undefined) {
      // Only pay attention to encoding if it's a string. This
      // prevents accidentally sending in a number that would
      // be interpretted as a start offset.
      return typeof encoding === 'string'
        ? createBuffer(that, size).fill(fill, encoding)
        : createBuffer(that, size).fill(fill)
    }
    return createBuffer(that, size)
  }

  /**
   * Creates a new filled Buffer instance.
   * alloc(size[, fill[, encoding]])
   **/
  Buffer.alloc = function (size, fill, encoding) {
    return alloc(null, size, fill, encoding)
  };

  function allocUnsafe (that, size) {
    assertSize(size);
    that = createBuffer(that, size < 0 ? 0 : checked(size) | 0);
    if (!Buffer.TYPED_ARRAY_SUPPORT) {
      for (var i = 0; i < size; ++i) {
        that[i] = 0;
      }
    }
    return that
  }

  /**
   * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
   * */
  Buffer.allocUnsafe = function (size) {
    return allocUnsafe(null, size)
  };
  /**
   * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
   */
  Buffer.allocUnsafeSlow = function (size) {
    return allocUnsafe(null, size)
  };

  function fromString (that, string, encoding) {
    if (typeof encoding !== 'string' || encoding === '') {
      encoding = 'utf8';
    }

    if (!Buffer.isEncoding(encoding)) {
      throw new TypeError('"encoding" must be a valid string encoding')
    }

    var length = byteLength(string, encoding) | 0;
    that = createBuffer(that, length);

    var actual = that.write(string, encoding);

    if (actual !== length) {
      // Writing a hex string, for example, that contains invalid characters will
      // cause everything after the first invalid character to be ignored. (e.g.
      // 'abxxcd' will be treated as 'ab')
      that = that.slice(0, actual);
    }

    return that
  }

  function fromArrayLike (that, array) {
    var length = array.length < 0 ? 0 : checked(array.length) | 0;
    that = createBuffer(that, length);
    for (var i = 0; i < length; i += 1) {
      that[i] = array[i] & 255;
    }
    return that
  }

  function fromArrayBuffer (that, array, byteOffset, length) {
    array.byteLength; // this throws if `array` is not a valid ArrayBuffer

    if (byteOffset < 0 || array.byteLength < byteOffset) {
      throw new RangeError('\'offset\' is out of bounds')
    }

    if (array.byteLength < byteOffset + (length || 0)) {
      throw new RangeError('\'length\' is out of bounds')
    }

    if (byteOffset === undefined && length === undefined) {
      array = new Uint8Array(array);
    } else if (length === undefined) {
      array = new Uint8Array(array, byteOffset);
    } else {
      array = new Uint8Array(array, byteOffset, length);
    }

    if (Buffer.TYPED_ARRAY_SUPPORT) {
      // Return an augmented `Uint8Array` instance, for best performance
      that = array;
      that.__proto__ = Buffer.prototype;
    } else {
      // Fallback: Return an object instance of the Buffer class
      that = fromArrayLike(that, array);
    }
    return that
  }

  function fromObject (that, obj) {
    if (internalIsBuffer(obj)) {
      var len = checked(obj.length) | 0;
      that = createBuffer(that, len);

      if (that.length === 0) {
        return that
      }

      obj.copy(that, 0, 0, len);
      return that
    }

    if (obj) {
      if ((typeof ArrayBuffer !== 'undefined' &&
          obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
        if (typeof obj.length !== 'number' || isnan(obj.length)) {
          return createBuffer(that, 0)
        }
        return fromArrayLike(that, obj)
      }

      if (obj.type === 'Buffer' && isArray$2(obj.data)) {
        return fromArrayLike(that, obj.data)
      }
    }

    throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
  }

  function checked (length) {
    // Note: cannot use `length < kMaxLength()` here because that fails when
    // length is NaN (which is otherwise coerced to zero.)
    if (length >= kMaxLength()) {
      throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                           'size: 0x' + kMaxLength().toString(16) + ' bytes')
    }
    return length | 0
  }
  Buffer.isBuffer = isBuffer$1;
  function internalIsBuffer (b) {
    return !!(b != null && b._isBuffer)
  }

  Buffer.compare = function compare (a, b) {
    if (!internalIsBuffer(a) || !internalIsBuffer(b)) {
      throw new TypeError('Arguments must be Buffers')
    }

    if (a === b) return 0

    var x = a.length;
    var y = b.length;

    for (var i = 0, len = Math.min(x, y); i < len; ++i) {
      if (a[i] !== b[i]) {
        x = a[i];
        y = b[i];
        break
      }
    }

    if (x < y) return -1
    if (y < x) return 1
    return 0
  };

  Buffer.isEncoding = function isEncoding (encoding) {
    switch (String(encoding).toLowerCase()) {
      case 'hex':
      case 'utf8':
      case 'utf-8':
      case 'ascii':
      case 'latin1':
      case 'binary':
      case 'base64':
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return true
      default:
        return false
    }
  };

  Buffer.concat = function concat (list, length) {
    if (!isArray$2(list)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }

    if (list.length === 0) {
      return Buffer.alloc(0)
    }

    var i;
    if (length === undefined) {
      length = 0;
      for (i = 0; i < list.length; ++i) {
        length += list[i].length;
      }
    }

    var buffer = Buffer.allocUnsafe(length);
    var pos = 0;
    for (i = 0; i < list.length; ++i) {
      var buf = list[i];
      if (!internalIsBuffer(buf)) {
        throw new TypeError('"list" argument must be an Array of Buffers')
      }
      buf.copy(buffer, pos);
      pos += buf.length;
    }
    return buffer
  };

  function byteLength (string, encoding) {
    if (internalIsBuffer(string)) {
      return string.length
    }
    if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
        (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
      return string.byteLength
    }
    if (typeof string !== 'string') {
      string = '' + string;
    }

    var len = string.length;
    if (len === 0) return 0

    // Use a for loop to avoid recursion
    var loweredCase = false;
    for (;;) {
      switch (encoding) {
        case 'ascii':
        case 'latin1':
        case 'binary':
          return len
        case 'utf8':
        case 'utf-8':
        case undefined:
          return utf8ToBytes(string).length
        case 'ucs2':
        case 'ucs-2':
        case 'utf16le':
        case 'utf-16le':
          return len * 2
        case 'hex':
          return len >>> 1
        case 'base64':
          return base64ToBytes(string).length
        default:
          if (loweredCase) return utf8ToBytes(string).length // assume utf8
          encoding = ('' + encoding).toLowerCase();
          loweredCase = true;
      }
    }
  }
  Buffer.byteLength = byteLength;

  function slowToString (encoding, start, end) {
    var loweredCase = false;

    // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
    // property of a typed array.

    // This behaves neither like String nor Uint8Array in that we set start/end
    // to their upper/lower bounds if the value passed is out of range.
    // undefined is handled specially as per ECMA-262 6th Edition,
    // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
    if (start === undefined || start < 0) {
      start = 0;
    }
    // Return early if start > this.length. Done here to prevent potential uint32
    // coercion fail below.
    if (start > this.length) {
      return ''
    }

    if (end === undefined || end > this.length) {
      end = this.length;
    }

    if (end <= 0) {
      return ''
    }

    // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
    end >>>= 0;
    start >>>= 0;

    if (end <= start) {
      return ''
    }

    if (!encoding) encoding = 'utf8';

    while (true) {
      switch (encoding) {
        case 'hex':
          return hexSlice(this, start, end)

        case 'utf8':
        case 'utf-8':
          return utf8Slice(this, start, end)

        case 'ascii':
          return asciiSlice(this, start, end)

        case 'latin1':
        case 'binary':
          return latin1Slice(this, start, end)

        case 'base64':
          return base64Slice(this, start, end)

        case 'ucs2':
        case 'ucs-2':
        case 'utf16le':
        case 'utf-16le':
          return utf16leSlice(this, start, end)

        default:
          if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
          encoding = (encoding + '').toLowerCase();
          loweredCase = true;
      }
    }
  }

  // The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
  // Buffer instances.
  Buffer.prototype._isBuffer = true;

  function swap (b, n, m) {
    var i = b[n];
    b[n] = b[m];
    b[m] = i;
  }

  Buffer.prototype.swap16 = function swap16 () {
    var len = this.length;
    if (len % 2 !== 0) {
      throw new RangeError('Buffer size must be a multiple of 16-bits')
    }
    for (var i = 0; i < len; i += 2) {
      swap(this, i, i + 1);
    }
    return this
  };

  Buffer.prototype.swap32 = function swap32 () {
    var len = this.length;
    if (len % 4 !== 0) {
      throw new RangeError('Buffer size must be a multiple of 32-bits')
    }
    for (var i = 0; i < len; i += 4) {
      swap(this, i, i + 3);
      swap(this, i + 1, i + 2);
    }
    return this
  };

  Buffer.prototype.swap64 = function swap64 () {
    var len = this.length;
    if (len % 8 !== 0) {
      throw new RangeError('Buffer size must be a multiple of 64-bits')
    }
    for (var i = 0; i < len; i += 8) {
      swap(this, i, i + 7);
      swap(this, i + 1, i + 6);
      swap(this, i + 2, i + 5);
      swap(this, i + 3, i + 4);
    }
    return this
  };

  Buffer.prototype.toString = function toString () {
    var length = this.length | 0;
    if (length === 0) return ''
    if (arguments.length === 0) return utf8Slice(this, 0, length)
    return slowToString.apply(this, arguments)
  };

  Buffer.prototype.equals = function equals (b) {
    if (!internalIsBuffer(b)) throw new TypeError('Argument must be a Buffer')
    if (this === b) return true
    return Buffer.compare(this, b) === 0
  };

  Buffer.prototype.inspect = function inspect () {
    var str = '';
    var max = INSPECT_MAX_BYTES;
    if (this.length > 0) {
      str = this.toString('hex', 0, max).match(/.{2}/g).join(' ');
      if (this.length > max) str += ' ... ';
    }
    return '<Buffer ' + str + '>'
  };

  Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
    if (!internalIsBuffer(target)) {
      throw new TypeError('Argument must be a Buffer')
    }

    if (start === undefined) {
      start = 0;
    }
    if (end === undefined) {
      end = target ? target.length : 0;
    }
    if (thisStart === undefined) {
      thisStart = 0;
    }
    if (thisEnd === undefined) {
      thisEnd = this.length;
    }

    if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
      throw new RangeError('out of range index')
    }

    if (thisStart >= thisEnd && start >= end) {
      return 0
    }
    if (thisStart >= thisEnd) {
      return -1
    }
    if (start >= end) {
      return 1
    }

    start >>>= 0;
    end >>>= 0;
    thisStart >>>= 0;
    thisEnd >>>= 0;

    if (this === target) return 0

    var x = thisEnd - thisStart;
    var y = end - start;
    var len = Math.min(x, y);

    var thisCopy = this.slice(thisStart, thisEnd);
    var targetCopy = target.slice(start, end);

    for (var i = 0; i < len; ++i) {
      if (thisCopy[i] !== targetCopy[i]) {
        x = thisCopy[i];
        y = targetCopy[i];
        break
      }
    }

    if (x < y) return -1
    if (y < x) return 1
    return 0
  };

  // Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
  // OR the last index of `val` in `buffer` at offset <= `byteOffset`.
  //
  // Arguments:
  // - buffer - a Buffer to search
  // - val - a string, Buffer, or number
  // - byteOffset - an index into `buffer`; will be clamped to an int32
  // - encoding - an optional encoding, relevant is val is a string
  // - dir - true for indexOf, false for lastIndexOf
  function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
    // Empty buffer means no match
    if (buffer.length === 0) return -1

    // Normalize byteOffset
    if (typeof byteOffset === 'string') {
      encoding = byteOffset;
      byteOffset = 0;
    } else if (byteOffset > 0x7fffffff) {
      byteOffset = 0x7fffffff;
    } else if (byteOffset < -0x80000000) {
      byteOffset = -0x80000000;
    }
    byteOffset = +byteOffset;  // Coerce to Number.
    if (isNaN(byteOffset)) {
      // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
      byteOffset = dir ? 0 : (buffer.length - 1);
    }

    // Normalize byteOffset: negative offsets start from the end of the buffer
    if (byteOffset < 0) byteOffset = buffer.length + byteOffset;
    if (byteOffset >= buffer.length) {
      if (dir) return -1
      else byteOffset = buffer.length - 1;
    } else if (byteOffset < 0) {
      if (dir) byteOffset = 0;
      else return -1
    }

    // Normalize val
    if (typeof val === 'string') {
      val = Buffer.from(val, encoding);
    }

    // Finally, search either indexOf (if dir is true) or lastIndexOf
    if (internalIsBuffer(val)) {
      // Special case: looking for empty string/buffer always fails
      if (val.length === 0) {
        return -1
      }
      return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
    } else if (typeof val === 'number') {
      val = val & 0xFF; // Search for a byte value [0-255]
      if (Buffer.TYPED_ARRAY_SUPPORT &&
          typeof Uint8Array.prototype.indexOf === 'function') {
        if (dir) {
          return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
        } else {
          return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
        }
      }
      return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
    }

    throw new TypeError('val must be string, number or Buffer')
  }

  function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
    var indexSize = 1;
    var arrLength = arr.length;
    var valLength = val.length;

    if (encoding !== undefined) {
      encoding = String(encoding).toLowerCase();
      if (encoding === 'ucs2' || encoding === 'ucs-2' ||
          encoding === 'utf16le' || encoding === 'utf-16le') {
        if (arr.length < 2 || val.length < 2) {
          return -1
        }
        indexSize = 2;
        arrLength /= 2;
        valLength /= 2;
        byteOffset /= 2;
      }
    }

    function read (buf, i) {
      if (indexSize === 1) {
        return buf[i]
      } else {
        return buf.readUInt16BE(i * indexSize)
      }
    }

    var i;
    if (dir) {
      var foundIndex = -1;
      for (i = byteOffset; i < arrLength; i++) {
        if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
          if (foundIndex === -1) foundIndex = i;
          if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
        } else {
          if (foundIndex !== -1) i -= i - foundIndex;
          foundIndex = -1;
        }
      }
    } else {
      if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength;
      for (i = byteOffset; i >= 0; i--) {
        var found = true;
        for (var j = 0; j < valLength; j++) {
          if (read(arr, i + j) !== read(val, j)) {
            found = false;
            break
          }
        }
        if (found) return i
      }
    }

    return -1
  }

  Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
    return this.indexOf(val, byteOffset, encoding) !== -1
  };

  Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
    return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
  };

  Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
    return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
  };

  function hexWrite (buf, string, offset, length) {
    offset = Number(offset) || 0;
    var remaining = buf.length - offset;
    if (!length) {
      length = remaining;
    } else {
      length = Number(length);
      if (length > remaining) {
        length = remaining;
      }
    }

    // must be an even number of digits
    var strLen = string.length;
    if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

    if (length > strLen / 2) {
      length = strLen / 2;
    }
    for (var i = 0; i < length; ++i) {
      var parsed = parseInt(string.substr(i * 2, 2), 16);
      if (isNaN(parsed)) return i
      buf[offset + i] = parsed;
    }
    return i
  }

  function utf8Write (buf, string, offset, length) {
    return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
  }

  function asciiWrite (buf, string, offset, length) {
    return blitBuffer(asciiToBytes(string), buf, offset, length)
  }

  function latin1Write (buf, string, offset, length) {
    return asciiWrite(buf, string, offset, length)
  }

  function base64Write (buf, string, offset, length) {
    return blitBuffer(base64ToBytes(string), buf, offset, length)
  }

  function ucs2Write (buf, string, offset, length) {
    return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
  }

  Buffer.prototype.write = function write (string, offset, length, encoding) {
    // Buffer#write(string)
    if (offset === undefined) {
      encoding = 'utf8';
      length = this.length;
      offset = 0;
    // Buffer#write(string, encoding)
    } else if (length === undefined && typeof offset === 'string') {
      encoding = offset;
      length = this.length;
      offset = 0;
    // Buffer#write(string, offset[, length][, encoding])
    } else if (isFinite(offset)) {
      offset = offset | 0;
      if (isFinite(length)) {
        length = length | 0;
        if (encoding === undefined) encoding = 'utf8';
      } else {
        encoding = length;
        length = undefined;
      }
    // legacy write(string, encoding, offset, length) - remove in v0.13
    } else {
      throw new Error(
        'Buffer.write(string, encoding, offset[, length]) is no longer supported'
      )
    }

    var remaining = this.length - offset;
    if (length === undefined || length > remaining) length = remaining;

    if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
      throw new RangeError('Attempt to write outside buffer bounds')
    }

    if (!encoding) encoding = 'utf8';

    var loweredCase = false;
    for (;;) {
      switch (encoding) {
        case 'hex':
          return hexWrite(this, string, offset, length)

        case 'utf8':
        case 'utf-8':
          return utf8Write(this, string, offset, length)

        case 'ascii':
          return asciiWrite(this, string, offset, length)

        case 'latin1':
        case 'binary':
          return latin1Write(this, string, offset, length)

        case 'base64':
          // Warning: maxLength not taken into account in base64Write
          return base64Write(this, string, offset, length)

        case 'ucs2':
        case 'ucs-2':
        case 'utf16le':
        case 'utf-16le':
          return ucs2Write(this, string, offset, length)

        default:
          if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
          encoding = ('' + encoding).toLowerCase();
          loweredCase = true;
      }
    }
  };

  Buffer.prototype.toJSON = function toJSON () {
    return {
      type: 'Buffer',
      data: Array.prototype.slice.call(this._arr || this, 0)
    }
  };

  function base64Slice (buf, start, end) {
    if (start === 0 && end === buf.length) {
      return fromByteArray(buf)
    } else {
      return fromByteArray(buf.slice(start, end))
    }
  }

  function utf8Slice (buf, start, end) {
    end = Math.min(buf.length, end);
    var res = [];

    var i = start;
    while (i < end) {
      var firstByte = buf[i];
      var codePoint = null;
      var bytesPerSequence = (firstByte > 0xEF) ? 4
        : (firstByte > 0xDF) ? 3
        : (firstByte > 0xBF) ? 2
        : 1;

      if (i + bytesPerSequence <= end) {
        var secondByte, thirdByte, fourthByte, tempCodePoint;

        switch (bytesPerSequence) {
          case 1:
            if (firstByte < 0x80) {
              codePoint = firstByte;
            }
            break
          case 2:
            secondByte = buf[i + 1];
            if ((secondByte & 0xC0) === 0x80) {
              tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F);
              if (tempCodePoint > 0x7F) {
                codePoint = tempCodePoint;
              }
            }
            break
          case 3:
            secondByte = buf[i + 1];
            thirdByte = buf[i + 2];
            if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
              tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F);
              if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
                codePoint = tempCodePoint;
              }
            }
            break
          case 4:
            secondByte = buf[i + 1];
            thirdByte = buf[i + 2];
            fourthByte = buf[i + 3];
            if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
              tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F);
              if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
                codePoint = tempCodePoint;
              }
            }
        }
      }

      if (codePoint === null) {
        // we did not generate a valid codePoint so insert a
        // replacement char (U+FFFD) and advance only 1 byte
        codePoint = 0xFFFD;
        bytesPerSequence = 1;
      } else if (codePoint > 0xFFFF) {
        // encode to utf16 (surrogate pair dance)
        codePoint -= 0x10000;
        res.push(codePoint >>> 10 & 0x3FF | 0xD800);
        codePoint = 0xDC00 | codePoint & 0x3FF;
      }

      res.push(codePoint);
      i += bytesPerSequence;
    }

    return decodeCodePointsArray(res)
  }

  // Based on http://stackoverflow.com/a/22747272/680742, the browser with
  // the lowest limit is Chrome, with 0x10000 args.
  // We go 1 magnitude less, for safety
  var MAX_ARGUMENTS_LENGTH = 0x1000;

  function decodeCodePointsArray (codePoints) {
    var len = codePoints.length;
    if (len <= MAX_ARGUMENTS_LENGTH) {
      return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
    }

    // Decode in chunks to avoid "call stack size exceeded".
    var res = '';
    var i = 0;
    while (i < len) {
      res += String.fromCharCode.apply(
        String,
        codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
      );
    }
    return res
  }

  function asciiSlice (buf, start, end) {
    var ret = '';
    end = Math.min(buf.length, end);

    for (var i = start; i < end; ++i) {
      ret += String.fromCharCode(buf[i] & 0x7F);
    }
    return ret
  }

  function latin1Slice (buf, start, end) {
    var ret = '';
    end = Math.min(buf.length, end);

    for (var i = start; i < end; ++i) {
      ret += String.fromCharCode(buf[i]);
    }
    return ret
  }

  function hexSlice (buf, start, end) {
    var len = buf.length;

    if (!start || start < 0) start = 0;
    if (!end || end < 0 || end > len) end = len;

    var out = '';
    for (var i = start; i < end; ++i) {
      out += toHex(buf[i]);
    }
    return out
  }

  function utf16leSlice (buf, start, end) {
    var bytes = buf.slice(start, end);
    var res = '';
    for (var i = 0; i < bytes.length; i += 2) {
      res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
    }
    return res
  }

  Buffer.prototype.slice = function slice (start, end) {
    var len = this.length;
    start = ~~start;
    end = end === undefined ? len : ~~end;

    if (start < 0) {
      start += len;
      if (start < 0) start = 0;
    } else if (start > len) {
      start = len;
    }

    if (end < 0) {
      end += len;
      if (end < 0) end = 0;
    } else if (end > len) {
      end = len;
    }

    if (end < start) end = start;

    var newBuf;
    if (Buffer.TYPED_ARRAY_SUPPORT) {
      newBuf = this.subarray(start, end);
      newBuf.__proto__ = Buffer.prototype;
    } else {
      var sliceLen = end - start;
      newBuf = new Buffer(sliceLen, undefined);
      for (var i = 0; i < sliceLen; ++i) {
        newBuf[i] = this[i + start];
      }
    }

    return newBuf
  };

  /*
   * Need to make sure that buffer isn't trying to write out of bounds.
   */
  function checkOffset (offset, ext, length) {
    if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
    if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
  }

  Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
    offset = offset | 0;
    byteLength = byteLength | 0;
    if (!noAssert) checkOffset(offset, byteLength, this.length);

    var val = this[offset];
    var mul = 1;
    var i = 0;
    while (++i < byteLength && (mul *= 0x100)) {
      val += this[offset + i] * mul;
    }

    return val
  };

  Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
    offset = offset | 0;
    byteLength = byteLength | 0;
    if (!noAssert) {
      checkOffset(offset, byteLength, this.length);
    }

    var val = this[offset + --byteLength];
    var mul = 1;
    while (byteLength > 0 && (mul *= 0x100)) {
      val += this[offset + --byteLength] * mul;
    }

    return val
  };

  Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
    if (!noAssert) checkOffset(offset, 1, this.length);
    return this[offset]
  };

  Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
    if (!noAssert) checkOffset(offset, 2, this.length);
    return this[offset] | (this[offset + 1] << 8)
  };

  Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
    if (!noAssert) checkOffset(offset, 2, this.length);
    return (this[offset] << 8) | this[offset + 1]
  };

  Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
    if (!noAssert) checkOffset(offset, 4, this.length);

    return ((this[offset]) |
        (this[offset + 1] << 8) |
        (this[offset + 2] << 16)) +
        (this[offset + 3] * 0x1000000)
  };

  Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
    if (!noAssert) checkOffset(offset, 4, this.length);

    return (this[offset] * 0x1000000) +
      ((this[offset + 1] << 16) |
      (this[offset + 2] << 8) |
      this[offset + 3])
  };

  Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
    offset = offset | 0;
    byteLength = byteLength | 0;
    if (!noAssert) checkOffset(offset, byteLength, this.length);

    var val = this[offset];
    var mul = 1;
    var i = 0;
    while (++i < byteLength && (mul *= 0x100)) {
      val += this[offset + i] * mul;
    }
    mul *= 0x80;

    if (val >= mul) val -= Math.pow(2, 8 * byteLength);

    return val
  };

  Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
    offset = offset | 0;
    byteLength = byteLength | 0;
    if (!noAssert) checkOffset(offset, byteLength, this.length);

    var i = byteLength;
    var mul = 1;
    var val = this[offset + --i];
    while (i > 0 && (mul *= 0x100)) {
      val += this[offset + --i] * mul;
    }
    mul *= 0x80;

    if (val >= mul) val -= Math.pow(2, 8 * byteLength);

    return val
  };

  Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
    if (!noAssert) checkOffset(offset, 1, this.length);
    if (!(this[offset] & 0x80)) return (this[offset])
    return ((0xff - this[offset] + 1) * -1)
  };

  Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
    if (!noAssert) checkOffset(offset, 2, this.length);
    var val = this[offset] | (this[offset + 1] << 8);
    return (val & 0x8000) ? val | 0xFFFF0000 : val
  };

  Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
    if (!noAssert) checkOffset(offset, 2, this.length);
    var val = this[offset + 1] | (this[offset] << 8);
    return (val & 0x8000) ? val | 0xFFFF0000 : val
  };

  Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
    if (!noAssert) checkOffset(offset, 4, this.length);

    return (this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16) |
      (this[offset + 3] << 24)
  };

  Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
    if (!noAssert) checkOffset(offset, 4, this.length);

    return (this[offset] << 24) |
      (this[offset + 1] << 16) |
      (this[offset + 2] << 8) |
      (this[offset + 3])
  };

  Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
    if (!noAssert) checkOffset(offset, 4, this.length);
    return read(this, offset, true, 23, 4)
  };

  Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
    if (!noAssert) checkOffset(offset, 4, this.length);
    return read(this, offset, false, 23, 4)
  };

  Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
    if (!noAssert) checkOffset(offset, 8, this.length);
    return read(this, offset, true, 52, 8)
  };

  Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
    if (!noAssert) checkOffset(offset, 8, this.length);
    return read(this, offset, false, 52, 8)
  };

  function checkInt (buf, value, offset, ext, max, min) {
    if (!internalIsBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
    if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
    if (offset + ext > buf.length) throw new RangeError('Index out of range')
  }

  Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
    value = +value;
    offset = offset | 0;
    byteLength = byteLength | 0;
    if (!noAssert) {
      var maxBytes = Math.pow(2, 8 * byteLength) - 1;
      checkInt(this, value, offset, byteLength, maxBytes, 0);
    }

    var mul = 1;
    var i = 0;
    this[offset] = value & 0xFF;
    while (++i < byteLength && (mul *= 0x100)) {
      this[offset + i] = (value / mul) & 0xFF;
    }

    return offset + byteLength
  };

  Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
    value = +value;
    offset = offset | 0;
    byteLength = byteLength | 0;
    if (!noAssert) {
      var maxBytes = Math.pow(2, 8 * byteLength) - 1;
      checkInt(this, value, offset, byteLength, maxBytes, 0);
    }

    var i = byteLength - 1;
    var mul = 1;
    this[offset + i] = value & 0xFF;
    while (--i >= 0 && (mul *= 0x100)) {
      this[offset + i] = (value / mul) & 0xFF;
    }

    return offset + byteLength
  };

  Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
    value = +value;
    offset = offset | 0;
    if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0);
    if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
    this[offset] = (value & 0xff);
    return offset + 1
  };

  function objectWriteUInt16 (buf, value, offset, littleEndian) {
    if (value < 0) value = 0xffff + value + 1;
    for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
      buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
        (littleEndian ? i : 1 - i) * 8;
    }
  }

  Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
    value = +value;
    offset = offset | 0;
    if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
    if (Buffer.TYPED_ARRAY_SUPPORT) {
      this[offset] = (value & 0xff);
      this[offset + 1] = (value >>> 8);
    } else {
      objectWriteUInt16(this, value, offset, true);
    }
    return offset + 2
  };

  Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
    value = +value;
    offset = offset | 0;
    if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
    if (Buffer.TYPED_ARRAY_SUPPORT) {
      this[offset] = (value >>> 8);
      this[offset + 1] = (value & 0xff);
    } else {
      objectWriteUInt16(this, value, offset, false);
    }
    return offset + 2
  };

  function objectWriteUInt32 (buf, value, offset, littleEndian) {
    if (value < 0) value = 0xffffffff + value + 1;
    for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
      buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff;
    }
  }

  Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
    value = +value;
    offset = offset | 0;
    if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
    if (Buffer.TYPED_ARRAY_SUPPORT) {
      this[offset + 3] = (value >>> 24);
      this[offset + 2] = (value >>> 16);
      this[offset + 1] = (value >>> 8);
      this[offset] = (value & 0xff);
    } else {
      objectWriteUInt32(this, value, offset, true);
    }
    return offset + 4
  };

  Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
    value = +value;
    offset = offset | 0;
    if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
    if (Buffer.TYPED_ARRAY_SUPPORT) {
      this[offset] = (value >>> 24);
      this[offset + 1] = (value >>> 16);
      this[offset + 2] = (value >>> 8);
      this[offset + 3] = (value & 0xff);
    } else {
      objectWriteUInt32(this, value, offset, false);
    }
    return offset + 4
  };

  Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
    value = +value;
    offset = offset | 0;
    if (!noAssert) {
      var limit = Math.pow(2, 8 * byteLength - 1);

      checkInt(this, value, offset, byteLength, limit - 1, -limit);
    }

    var i = 0;
    var mul = 1;
    var sub = 0;
    this[offset] = value & 0xFF;
    while (++i < byteLength && (mul *= 0x100)) {
      if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
        sub = 1;
      }
      this[offset + i] = ((value / mul) >> 0) - sub & 0xFF;
    }

    return offset + byteLength
  };

  Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
    value = +value;
    offset = offset | 0;
    if (!noAssert) {
      var limit = Math.pow(2, 8 * byteLength - 1);

      checkInt(this, value, offset, byteLength, limit - 1, -limit);
    }

    var i = byteLength - 1;
    var mul = 1;
    var sub = 0;
    this[offset + i] = value & 0xFF;
    while (--i >= 0 && (mul *= 0x100)) {
      if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
        sub = 1;
      }
      this[offset + i] = ((value / mul) >> 0) - sub & 0xFF;
    }

    return offset + byteLength
  };

  Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
    value = +value;
    offset = offset | 0;
    if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80);
    if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
    if (value < 0) value = 0xff + value + 1;
    this[offset] = (value & 0xff);
    return offset + 1
  };

  Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
    value = +value;
    offset = offset | 0;
    if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
    if (Buffer.TYPED_ARRAY_SUPPORT) {
      this[offset] = (value & 0xff);
      this[offset + 1] = (value >>> 8);
    } else {
      objectWriteUInt16(this, value, offset, true);
    }
    return offset + 2
  };

  Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
    value = +value;
    offset = offset | 0;
    if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
    if (Buffer.TYPED_ARRAY_SUPPORT) {
      this[offset] = (value >>> 8);
      this[offset + 1] = (value & 0xff);
    } else {
      objectWriteUInt16(this, value, offset, false);
    }
    return offset + 2
  };

  Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
    value = +value;
    offset = offset | 0;
    if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
    if (Buffer.TYPED_ARRAY_SUPPORT) {
      this[offset] = (value & 0xff);
      this[offset + 1] = (value >>> 8);
      this[offset + 2] = (value >>> 16);
      this[offset + 3] = (value >>> 24);
    } else {
      objectWriteUInt32(this, value, offset, true);
    }
    return offset + 4
  };

  Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
    value = +value;
    offset = offset | 0;
    if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
    if (value < 0) value = 0xffffffff + value + 1;
    if (Buffer.TYPED_ARRAY_SUPPORT) {
      this[offset] = (value >>> 24);
      this[offset + 1] = (value >>> 16);
      this[offset + 2] = (value >>> 8);
      this[offset + 3] = (value & 0xff);
    } else {
      objectWriteUInt32(this, value, offset, false);
    }
    return offset + 4
  };

  function checkIEEE754 (buf, value, offset, ext, max, min) {
    if (offset + ext > buf.length) throw new RangeError('Index out of range')
    if (offset < 0) throw new RangeError('Index out of range')
  }

  function writeFloat (buf, value, offset, littleEndian, noAssert) {
    if (!noAssert) {
      checkIEEE754(buf, value, offset, 4);
    }
    write(buf, value, offset, littleEndian, 23, 4);
    return offset + 4
  }

  Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
    return writeFloat(this, value, offset, true, noAssert)
  };

  Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
    return writeFloat(this, value, offset, false, noAssert)
  };

  function writeDouble (buf, value, offset, littleEndian, noAssert) {
    if (!noAssert) {
      checkIEEE754(buf, value, offset, 8);
    }
    write(buf, value, offset, littleEndian, 52, 8);
    return offset + 8
  }

  Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
    return writeDouble(this, value, offset, true, noAssert)
  };

  Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
    return writeDouble(this, value, offset, false, noAssert)
  };

  // copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
  Buffer.prototype.copy = function copy (target, targetStart, start, end) {
    if (!start) start = 0;
    if (!end && end !== 0) end = this.length;
    if (targetStart >= target.length) targetStart = target.length;
    if (!targetStart) targetStart = 0;
    if (end > 0 && end < start) end = start;

    // Copy 0 bytes; we're done
    if (end === start) return 0
    if (target.length === 0 || this.length === 0) return 0

    // Fatal error conditions
    if (targetStart < 0) {
      throw new RangeError('targetStart out of bounds')
    }
    if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
    if (end < 0) throw new RangeError('sourceEnd out of bounds')

    // Are we oob?
    if (end > this.length) end = this.length;
    if (target.length - targetStart < end - start) {
      end = target.length - targetStart + start;
    }

    var len = end - start;
    var i;

    if (this === target && start < targetStart && targetStart < end) {
      // descending copy from end
      for (i = len - 1; i >= 0; --i) {
        target[i + targetStart] = this[i + start];
      }
    } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
      // ascending copy from start
      for (i = 0; i < len; ++i) {
        target[i + targetStart] = this[i + start];
      }
    } else {
      Uint8Array.prototype.set.call(
        target,
        this.subarray(start, start + len),
        targetStart
      );
    }

    return len
  };

  // Usage:
  //    buffer.fill(number[, offset[, end]])
  //    buffer.fill(buffer[, offset[, end]])
  //    buffer.fill(string[, offset[, end]][, encoding])
  Buffer.prototype.fill = function fill (val, start, end, encoding) {
    // Handle string cases:
    if (typeof val === 'string') {
      if (typeof start === 'string') {
        encoding = start;
        start = 0;
        end = this.length;
      } else if (typeof end === 'string') {
        encoding = end;
        end = this.length;
      }
      if (val.length === 1) {
        var code = val.charCodeAt(0);
        if (code < 256) {
          val = code;
        }
      }
      if (encoding !== undefined && typeof encoding !== 'string') {
        throw new TypeError('encoding must be a string')
      }
      if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
        throw new TypeError('Unknown encoding: ' + encoding)
      }
    } else if (typeof val === 'number') {
      val = val & 255;
    }

    // Invalid ranges are not set to a default, so can range check early.
    if (start < 0 || this.length < start || this.length < end) {
      throw new RangeError('Out of range index')
    }

    if (end <= start) {
      return this
    }

    start = start >>> 0;
    end = end === undefined ? this.length : end >>> 0;

    if (!val) val = 0;

    var i;
    if (typeof val === 'number') {
      for (i = start; i < end; ++i) {
        this[i] = val;
      }
    } else {
      var bytes = internalIsBuffer(val)
        ? val
        : utf8ToBytes(new Buffer(val, encoding).toString());
      var len = bytes.length;
      for (i = 0; i < end - start; ++i) {
        this[i + start] = bytes[i % len];
      }
    }

    return this
  };

  // HELPER FUNCTIONS
  // ================

  var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g;

  function base64clean (str) {
    // Node strips out invalid characters like \n and \t from the string, base64-js does not
    str = stringtrim(str).replace(INVALID_BASE64_RE, '');
    // Node converts strings with length < 2 to ''
    if (str.length < 2) return ''
    // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
    while (str.length % 4 !== 0) {
      str = str + '=';
    }
    return str
  }

  function stringtrim (str) {
    if (str.trim) return str.trim()
    return str.replace(/^\s+|\s+$/g, '')
  }

  function toHex (n) {
    if (n < 16) return '0' + n.toString(16)
    return n.toString(16)
  }

  function utf8ToBytes (string, units) {
    units = units || Infinity;
    var codePoint;
    var length = string.length;
    var leadSurrogate = null;
    var bytes = [];

    for (var i = 0; i < length; ++i) {
      codePoint = string.charCodeAt(i);

      // is surrogate component
      if (codePoint > 0xD7FF && codePoint < 0xE000) {
        // last char was a lead
        if (!leadSurrogate) {
          // no lead yet
          if (codePoint > 0xDBFF) {
            // unexpected trail
            if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
            continue
          } else if (i + 1 === length) {
            // unpaired lead
            if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
            continue
          }

          // valid lead
          leadSurrogate = codePoint;

          continue
        }

        // 2 leads in a row
        if (codePoint < 0xDC00) {
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
          leadSurrogate = codePoint;
          continue
        }

        // valid surrogate pair
        codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000;
      } else if (leadSurrogate) {
        // valid bmp char, but last char was a lead
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
      }

      leadSurrogate = null;

      // encode utf8
      if (codePoint < 0x80) {
        if ((units -= 1) < 0) break
        bytes.push(codePoint);
      } else if (codePoint < 0x800) {
        if ((units -= 2) < 0) break
        bytes.push(
          codePoint >> 0x6 | 0xC0,
          codePoint & 0x3F | 0x80
        );
      } else if (codePoint < 0x10000) {
        if ((units -= 3) < 0) break
        bytes.push(
          codePoint >> 0xC | 0xE0,
          codePoint >> 0x6 & 0x3F | 0x80,
          codePoint & 0x3F | 0x80
        );
      } else if (codePoint < 0x110000) {
        if ((units -= 4) < 0) break
        bytes.push(
          codePoint >> 0x12 | 0xF0,
          codePoint >> 0xC & 0x3F | 0x80,
          codePoint >> 0x6 & 0x3F | 0x80,
          codePoint & 0x3F | 0x80
        );
      } else {
        throw new Error('Invalid code point')
      }
    }

    return bytes
  }

  function asciiToBytes (str) {
    var byteArray = [];
    for (var i = 0; i < str.length; ++i) {
      // Node's code seems to be doing this and not & 0x7F..
      byteArray.push(str.charCodeAt(i) & 0xFF);
    }
    return byteArray
  }

  function utf16leToBytes (str, units) {
    var c, hi, lo;
    var byteArray = [];
    for (var i = 0; i < str.length; ++i) {
      if ((units -= 2) < 0) break

      c = str.charCodeAt(i);
      hi = c >> 8;
      lo = c % 256;
      byteArray.push(lo);
      byteArray.push(hi);
    }

    return byteArray
  }


  function base64ToBytes (str) {
    return toByteArray(base64clean(str))
  }

  function blitBuffer (src, dst, offset, length) {
    for (var i = 0; i < length; ++i) {
      if ((i + offset >= dst.length) || (i >= src.length)) break
      dst[i + offset] = src[i];
    }
    return i
  }

  function isnan (val) {
    return val !== val // eslint-disable-line no-self-compare
  }


  // the following is from is-buffer, also by Feross Aboukhadijeh and with same lisence
  // The _isBuffer check is for Safari 5-7 support, because it's missing
  // Object.prototype.constructor. Remove this eventually
  function isBuffer$1(obj) {
    return obj != null && (!!obj._isBuffer || isFastBuffer(obj) || isSlowBuffer(obj))
  }

  function isFastBuffer (obj) {
    return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
  }

  // For Node v0.10 support. Remove this eventually.
  function isSlowBuffer (obj) {
    return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isFastBuffer(obj.slice(0, 0))
  }

  var hasFetch = isFunction$1(global$1.fetch) && isFunction$1(global$1.ReadableStream);

  var _blobConstructor;
  function blobConstructor() {
    if (typeof _blobConstructor !== 'undefined') {
      return _blobConstructor;
    }
    try {
      new global$1.Blob([new ArrayBuffer(1)]);
      _blobConstructor = true;
    } catch (e) {
      _blobConstructor = false;
    }
    return _blobConstructor
  }
  var xhr;

  function checkTypeSupport(type) {
    if (!xhr) {
      xhr = new global$1.XMLHttpRequest();
      // If location.host is empty, e.g. if this page/worker was loaded
      // from a Blob, then use example.com to avoid an error
      xhr.open('GET', global$1.location.host ? '/' : 'https://example.com');
    }
    try {
      xhr.responseType = type;
      return xhr.responseType === type
    } catch (e) {
      return false
    }

  }

  // For some strange reason, Safari 7.0 reports typeof global.ArrayBuffer === 'object'.
  // Safari 7.1 appears to have fixed this bug.
  var haveArrayBuffer = typeof global$1.ArrayBuffer !== 'undefined';
  var haveSlice = haveArrayBuffer && isFunction$1(global$1.ArrayBuffer.prototype.slice);

  var arraybuffer = haveArrayBuffer && checkTypeSupport('arraybuffer');
    // These next two tests unavoidably show warnings in Chrome. Since fetch will always
    // be used if it's available, just return false for these to avoid the warnings.
  var msstream = !hasFetch && haveSlice && checkTypeSupport('ms-stream');
  var mozchunkedarraybuffer = !hasFetch && haveArrayBuffer &&
    checkTypeSupport('moz-chunked-arraybuffer');
  var overrideMimeType = isFunction$1(xhr.overrideMimeType);
  var vbArray = isFunction$1(global$1.VBArray);

  function isFunction$1(value) {
    return typeof value === 'function'
  }

  xhr = null; // Help gc

  var inherits;
  if (typeof Object.create === 'function'){
    inherits = function inherits(ctor, superCtor) {
      // implementation from standard node.js 'util' module
      ctor.super_ = superCtor;
      ctor.prototype = Object.create(superCtor.prototype, {
        constructor: {
          value: ctor,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
    };
  } else {
    inherits = function inherits(ctor, superCtor) {
      ctor.super_ = superCtor;
      var TempCtor = function () {};
      TempCtor.prototype = superCtor.prototype;
      ctor.prototype = new TempCtor();
      ctor.prototype.constructor = ctor;
    };
  }
  var inherits$1 = inherits;

  var formatRegExp = /%[sdj%]/g;
  function format$1(f) {
    if (!isString(f)) {
      var objects = [];
      for (var i = 0; i < arguments.length; i++) {
        objects.push(inspect$1(arguments[i]));
      }
      return objects.join(' ');
    }

    var i = 1;
    var args = arguments;
    var len = args.length;
    var str = String(f).replace(formatRegExp, function(x) {
      if (x === '%%') return '%';
      if (i >= len) return x;
      switch (x) {
        case '%s': return String(args[i++]);
        case '%d': return Number(args[i++]);
        case '%j':
          try {
            return JSON.stringify(args[i++]);
          } catch (_) {
            return '[Circular]';
          }
        default:
          return x;
      }
    });
    for (var x = args[i]; i < len; x = args[++i]) {
      if (isNull(x) || !isObject(x)) {
        str += ' ' + x;
      } else {
        str += ' ' + inspect$1(x);
      }
    }
    return str;
  }

  // Mark that a method should not be used.
  // Returns a modified function which warns once by default.
  // If --no-deprecation is set, then it is a no-op.
  function deprecate(fn, msg) {
    // Allow for deprecating things in the process of starting up.
    if (isUndefined(global$1.process)) {
      return function() {
        return deprecate(fn, msg).apply(this, arguments);
      };
    }

    if (process.noDeprecation === true) {
      return fn;
    }

    var warned = false;
    function deprecated() {
      if (!warned) {
        if (process.throwDeprecation) {
          throw new Error(msg);
        } else if (process.traceDeprecation) {
          console.trace(msg);
        } else {
          console.error(msg);
        }
        warned = true;
      }
      return fn.apply(this, arguments);
    }

    return deprecated;
  }

  var debugs = {};
  var debugEnviron;
  function debuglog(set) {
    if (isUndefined(debugEnviron))
      debugEnviron = process.env.NODE_DEBUG || '';
    set = set.toUpperCase();
    if (!debugs[set]) {
      if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
        var pid = 0;
        debugs[set] = function() {
          var msg = format$1.apply(null, arguments);
          console.error('%s %d: %s', set, pid, msg);
        };
      } else {
        debugs[set] = function() {};
      }
    }
    return debugs[set];
  }

  /**
   * Echos the value of a value. Trys to print the value out
   * in the best way possible given the different types.
   *
   * @param {Object} obj The object to print out.
   * @param {Object} opts Optional options object that alters the output.
   */
  /* legacy: obj, showHidden, depth, colors*/
  function inspect$1(obj, opts) {
    // default options
    var ctx = {
      seen: [],
      stylize: stylizeNoColor
    };
    // legacy...
    if (arguments.length >= 3) ctx.depth = arguments[2];
    if (arguments.length >= 4) ctx.colors = arguments[3];
    if (isBoolean(opts)) {
      // legacy...
      ctx.showHidden = opts;
    } else if (opts) {
      // got an "options" object
      _extend(ctx, opts);
    }
    // set default options
    if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
    if (isUndefined(ctx.depth)) ctx.depth = 2;
    if (isUndefined(ctx.colors)) ctx.colors = false;
    if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
    if (ctx.colors) ctx.stylize = stylizeWithColor;
    return formatValue(ctx, obj, ctx.depth);
  }

  // http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
  inspect$1.colors = {
    'bold' : [1, 22],
    'italic' : [3, 23],
    'underline' : [4, 24],
    'inverse' : [7, 27],
    'white' : [37, 39],
    'grey' : [90, 39],
    'black' : [30, 39],
    'blue' : [34, 39],
    'cyan' : [36, 39],
    'green' : [32, 39],
    'magenta' : [35, 39],
    'red' : [31, 39],
    'yellow' : [33, 39]
  };

  // Don't use 'blue' not visible on cmd.exe
  inspect$1.styles = {
    'special': 'cyan',
    'number': 'yellow',
    'boolean': 'yellow',
    'undefined': 'grey',
    'null': 'bold',
    'string': 'green',
    'date': 'magenta',
    // "name": intentionally not styling
    'regexp': 'red'
  };


  function stylizeWithColor(str, styleType) {
    var style = inspect$1.styles[styleType];

    if (style) {
      return '\u001b[' + inspect$1.colors[style][0] + 'm' + str +
             '\u001b[' + inspect$1.colors[style][1] + 'm';
    } else {
      return str;
    }
  }


  function stylizeNoColor(str, styleType) {
    return str;
  }


  function arrayToHash(array) {
    var hash = {};

    array.forEach(function(val, idx) {
      hash[val] = true;
    });

    return hash;
  }


  function formatValue(ctx, value, recurseTimes) {
    // Provide a hook for user-specified inspect functions.
    // Check that value is an object with an inspect function on it
    if (ctx.customInspect &&
        value &&
        isFunction(value.inspect) &&
        // Filter out the util module, it's inspect function is special
        value.inspect !== inspect$1 &&
        // Also filter out any prototype objects using the circular check.
        !(value.constructor && value.constructor.prototype === value)) {
      var ret = value.inspect(recurseTimes, ctx);
      if (!isString(ret)) {
        ret = formatValue(ctx, ret, recurseTimes);
      }
      return ret;
    }

    // Primitive types cannot have properties
    var primitive = formatPrimitive(ctx, value);
    if (primitive) {
      return primitive;
    }

    // Look up the keys of the object.
    var keys = Object.keys(value);
    var visibleKeys = arrayToHash(keys);

    if (ctx.showHidden) {
      keys = Object.getOwnPropertyNames(value);
    }

    // IE doesn't make error fields non-enumerable
    // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
    if (isError(value)
        && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
      return formatError(value);
    }

    // Some type of object without properties can be shortcutted.
    if (keys.length === 0) {
      if (isFunction(value)) {
        var name = value.name ? ': ' + value.name : '';
        return ctx.stylize('[Function' + name + ']', 'special');
      }
      if (isRegExp(value)) {
        return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
      }
      if (isDate(value)) {
        return ctx.stylize(Date.prototype.toString.call(value), 'date');
      }
      if (isError(value)) {
        return formatError(value);
      }
    }

    var base = '', array = false, braces = ['{', '}'];

    // Make Array say that they are Array
    if (isArray$1(value)) {
      array = true;
      braces = ['[', ']'];
    }

    // Make functions say that they are functions
    if (isFunction(value)) {
      var n = value.name ? ': ' + value.name : '';
      base = ' [Function' + n + ']';
    }

    // Make RegExps say that they are RegExps
    if (isRegExp(value)) {
      base = ' ' + RegExp.prototype.toString.call(value);
    }

    // Make dates with properties first say the date
    if (isDate(value)) {
      base = ' ' + Date.prototype.toUTCString.call(value);
    }

    // Make error with message first say the error
    if (isError(value)) {
      base = ' ' + formatError(value);
    }

    if (keys.length === 0 && (!array || value.length == 0)) {
      return braces[0] + base + braces[1];
    }

    if (recurseTimes < 0) {
      if (isRegExp(value)) {
        return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
      } else {
        return ctx.stylize('[Object]', 'special');
      }
    }

    ctx.seen.push(value);

    var output;
    if (array) {
      output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
    } else {
      output = keys.map(function(key) {
        return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
      });
    }

    ctx.seen.pop();

    return reduceToSingleString(output, base, braces);
  }


  function formatPrimitive(ctx, value) {
    if (isUndefined(value))
      return ctx.stylize('undefined', 'undefined');
    if (isString(value)) {
      var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                               .replace(/'/g, "\\'")
                                               .replace(/\\"/g, '"') + '\'';
      return ctx.stylize(simple, 'string');
    }
    if (isNumber(value))
      return ctx.stylize('' + value, 'number');
    if (isBoolean(value))
      return ctx.stylize('' + value, 'boolean');
    // For some reason typeof null is "object", so special case here.
    if (isNull(value))
      return ctx.stylize('null', 'null');
  }


  function formatError(value) {
    return '[' + Error.prototype.toString.call(value) + ']';
  }


  function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
    var output = [];
    for (var i = 0, l = value.length; i < l; ++i) {
      if (hasOwnProperty$1(value, String(i))) {
        output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
            String(i), true));
      } else {
        output.push('');
      }
    }
    keys.forEach(function(key) {
      if (!key.match(/^\d+$/)) {
        output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
            key, true));
      }
    });
    return output;
  }


  function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
    var name, str, desc;
    desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
    if (desc.get) {
      if (desc.set) {
        str = ctx.stylize('[Getter/Setter]', 'special');
      } else {
        str = ctx.stylize('[Getter]', 'special');
      }
    } else {
      if (desc.set) {
        str = ctx.stylize('[Setter]', 'special');
      }
    }
    if (!hasOwnProperty$1(visibleKeys, key)) {
      name = '[' + key + ']';
    }
    if (!str) {
      if (ctx.seen.indexOf(desc.value) < 0) {
        if (isNull(recurseTimes)) {
          str = formatValue(ctx, desc.value, null);
        } else {
          str = formatValue(ctx, desc.value, recurseTimes - 1);
        }
        if (str.indexOf('\n') > -1) {
          if (array) {
            str = str.split('\n').map(function(line) {
              return '  ' + line;
            }).join('\n').substr(2);
          } else {
            str = '\n' + str.split('\n').map(function(line) {
              return '   ' + line;
            }).join('\n');
          }
        }
      } else {
        str = ctx.stylize('[Circular]', 'special');
      }
    }
    if (isUndefined(name)) {
      if (array && key.match(/^\d+$/)) {
        return str;
      }
      name = JSON.stringify('' + key);
      if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
        name = name.substr(1, name.length - 2);
        name = ctx.stylize(name, 'name');
      } else {
        name = name.replace(/'/g, "\\'")
                   .replace(/\\"/g, '"')
                   .replace(/(^"|"$)/g, "'");
        name = ctx.stylize(name, 'string');
      }
    }

    return name + ': ' + str;
  }


  function reduceToSingleString(output, base, braces) {
    var length = output.reduce(function(prev, cur) {
      if (cur.indexOf('\n') >= 0) ;
      return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
    }, 0);

    if (length > 60) {
      return braces[0] +
             (base === '' ? '' : base + '\n ') +
             ' ' +
             output.join(',\n  ') +
             ' ' +
             braces[1];
    }

    return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
  }


  // NOTE: These type checking functions intentionally don't use `instanceof`
  // because it is fragile and can be easily faked with `Object.create()`.
  function isArray$1(ar) {
    return Array.isArray(ar);
  }

  function isBoolean(arg) {
    return typeof arg === 'boolean';
  }

  function isNull(arg) {
    return arg === null;
  }

  function isNullOrUndefined(arg) {
    return arg == null;
  }

  function isNumber(arg) {
    return typeof arg === 'number';
  }

  function isString(arg) {
    return typeof arg === 'string';
  }

  function isSymbol(arg) {
    return typeof arg === 'symbol';
  }

  function isUndefined(arg) {
    return arg === void 0;
  }

  function isRegExp(re) {
    return isObject(re) && objectToString(re) === '[object RegExp]';
  }

  function isObject(arg) {
    return typeof arg === 'object' && arg !== null;
  }

  function isDate(d) {
    return isObject(d) && objectToString(d) === '[object Date]';
  }

  function isError(e) {
    return isObject(e) &&
        (objectToString(e) === '[object Error]' || e instanceof Error);
  }

  function isFunction(arg) {
    return typeof arg === 'function';
  }

  function isPrimitive(arg) {
    return arg === null ||
           typeof arg === 'boolean' ||
           typeof arg === 'number' ||
           typeof arg === 'string' ||
           typeof arg === 'symbol' ||  // ES6 symbol
           typeof arg === 'undefined';
  }

  function isBuffer(maybeBuf) {
    return Buffer.isBuffer(maybeBuf);
  }

  function objectToString(o) {
    return Object.prototype.toString.call(o);
  }


  function pad(n) {
    return n < 10 ? '0' + n.toString(10) : n.toString(10);
  }


  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
                'Oct', 'Nov', 'Dec'];

  // 26 Feb 16:19:34
  function timestamp() {
    var d = new Date();
    var time = [pad(d.getHours()),
                pad(d.getMinutes()),
                pad(d.getSeconds())].join(':');
    return [d.getDate(), months[d.getMonth()], time].join(' ');
  }


  // log is just a thin wrapper to console.log that prepends a timestamp
  function log() {
    console.log('%s - %s', timestamp(), format$1.apply(null, arguments));
  }

  function _extend(origin, add) {
    // Don't do anything if add isn't an object
    if (!add || !isObject(add)) return origin;

    var keys = Object.keys(add);
    var i = keys.length;
    while (i--) {
      origin[keys[i]] = add[keys[i]];
    }
    return origin;
  }
  function hasOwnProperty$1(obj, prop) {
    return Object.prototype.hasOwnProperty.call(obj, prop);
  }

  var util$1 = {
    inherits: inherits$1,
    _extend: _extend,
    log: log,
    isBuffer: isBuffer,
    isPrimitive: isPrimitive,
    isFunction: isFunction,
    isError: isError,
    isDate: isDate,
    isObject: isObject,
    isRegExp: isRegExp,
    isUndefined: isUndefined,
    isSymbol: isSymbol,
    isString: isString,
    isNumber: isNumber,
    isNullOrUndefined: isNullOrUndefined,
    isNull: isNull,
    isBoolean: isBoolean,
    isArray: isArray$1,
    inspect: inspect$1,
    deprecate: deprecate,
    format: format$1,
    debuglog: debuglog
  };

  var util$2 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    format: format$1,
    deprecate: deprecate,
    debuglog: debuglog,
    inspect: inspect$1,
    isArray: isArray$1,
    isBoolean: isBoolean,
    isNull: isNull,
    isNullOrUndefined: isNullOrUndefined,
    isNumber: isNumber,
    isString: isString,
    isSymbol: isSymbol,
    isUndefined: isUndefined,
    isRegExp: isRegExp,
    isObject: isObject,
    isDate: isDate,
    isError: isError,
    isFunction: isFunction,
    isPrimitive: isPrimitive,
    isBuffer: isBuffer,
    log: log,
    inherits: inherits$1,
    _extend: _extend,
    'default': util$1
  });

  var domain;

  // This constructor is used to store event handlers. Instantiating this is
  // faster than explicitly calling `Object.create(null)` to get a "clean" empty
  // object (tested with v8 v4.9).
  function EventHandlers() {}
  EventHandlers.prototype = Object.create(null);

  function EventEmitter() {
    EventEmitter.init.call(this);
  }

  // nodejs oddity
  // require('events') === require('events').EventEmitter
  EventEmitter.EventEmitter = EventEmitter;

  EventEmitter.usingDomains = false;

  EventEmitter.prototype.domain = undefined;
  EventEmitter.prototype._events = undefined;
  EventEmitter.prototype._maxListeners = undefined;

  // By default EventEmitters will print a warning if more than 10 listeners are
  // added to it. This is a useful default which helps finding memory leaks.
  EventEmitter.defaultMaxListeners = 10;

  EventEmitter.init = function() {
    this.domain = null;
    if (EventEmitter.usingDomains) {
      // if there is an active domain, then attach to it.
      if (domain.active ) ;
    }

    if (!this._events || this._events === Object.getPrototypeOf(this)._events) {
      this._events = new EventHandlers();
      this._eventsCount = 0;
    }

    this._maxListeners = this._maxListeners || undefined;
  };

  // Obviously not all Emitters should be limited to 10. This function allows
  // that to be increased. Set to zero for unlimited.
  EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
    if (typeof n !== 'number' || n < 0 || isNaN(n))
      throw new TypeError('"n" argument must be a positive number');
    this._maxListeners = n;
    return this;
  };

  function $getMaxListeners(that) {
    if (that._maxListeners === undefined)
      return EventEmitter.defaultMaxListeners;
    return that._maxListeners;
  }

  EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
    return $getMaxListeners(this);
  };

  // These standalone emit* functions are used to optimize calling of event
  // handlers for fast cases because emit() itself often has a variable number of
  // arguments and can be deoptimized because of that. These functions always have
  // the same number of arguments and thus do not get deoptimized, so the code
  // inside them can execute faster.
  function emitNone(handler, isFn, self) {
    if (isFn)
      handler.call(self);
    else {
      var len = handler.length;
      var listeners = arrayClone(handler, len);
      for (var i = 0; i < len; ++i)
        listeners[i].call(self);
    }
  }
  function emitOne(handler, isFn, self, arg1) {
    if (isFn)
      handler.call(self, arg1);
    else {
      var len = handler.length;
      var listeners = arrayClone(handler, len);
      for (var i = 0; i < len; ++i)
        listeners[i].call(self, arg1);
    }
  }
  function emitTwo(handler, isFn, self, arg1, arg2) {
    if (isFn)
      handler.call(self, arg1, arg2);
    else {
      var len = handler.length;
      var listeners = arrayClone(handler, len);
      for (var i = 0; i < len; ++i)
        listeners[i].call(self, arg1, arg2);
    }
  }
  function emitThree(handler, isFn, self, arg1, arg2, arg3) {
    if (isFn)
      handler.call(self, arg1, arg2, arg3);
    else {
      var len = handler.length;
      var listeners = arrayClone(handler, len);
      for (var i = 0; i < len; ++i)
        listeners[i].call(self, arg1, arg2, arg3);
    }
  }

  function emitMany(handler, isFn, self, args) {
    if (isFn)
      handler.apply(self, args);
    else {
      var len = handler.length;
      var listeners = arrayClone(handler, len);
      for (var i = 0; i < len; ++i)
        listeners[i].apply(self, args);
    }
  }

  EventEmitter.prototype.emit = function emit(type) {
    var er, handler, len, args, i, events, domain;
    var doError = (type === 'error');

    events = this._events;
    if (events)
      doError = (doError && events.error == null);
    else if (!doError)
      return false;

    domain = this.domain;

    // If there is no 'error' event listener then throw.
    if (doError) {
      er = arguments[1];
      if (domain) {
        if (!er)
          er = new Error('Uncaught, unspecified "error" event');
        er.domainEmitter = this;
        er.domain = domain;
        er.domainThrown = false;
        domain.emit('error', er);
      } else if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      } else {
        // At least give some kind of context to the user
        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
        err.context = er;
        throw err;
      }
      return false;
    }

    handler = events[type];

    if (!handler)
      return false;

    var isFn = typeof handler === 'function';
    len = arguments.length;
    switch (len) {
      // fast cases
      case 1:
        emitNone(handler, isFn, this);
        break;
      case 2:
        emitOne(handler, isFn, this, arguments[1]);
        break;
      case 3:
        emitTwo(handler, isFn, this, arguments[1], arguments[2]);
        break;
      case 4:
        emitThree(handler, isFn, this, arguments[1], arguments[2], arguments[3]);
        break;
      // slower
      default:
        args = new Array(len - 1);
        for (i = 1; i < len; i++)
          args[i - 1] = arguments[i];
        emitMany(handler, isFn, this, args);
    }

    return true;
  };

  function _addListener(target, type, listener, prepend) {
    var m;
    var events;
    var existing;

    if (typeof listener !== 'function')
      throw new TypeError('"listener" argument must be a function');

    events = target._events;
    if (!events) {
      events = target._events = new EventHandlers();
      target._eventsCount = 0;
    } else {
      // To avoid recursion in the case that type === "newListener"! Before
      // adding it to the listeners, first emit "newListener".
      if (events.newListener) {
        target.emit('newListener', type,
                    listener.listener ? listener.listener : listener);

        // Re-assign `events` because a newListener handler could have caused the
        // this._events to be assigned to a new object
        events = target._events;
      }
      existing = events[type];
    }

    if (!existing) {
      // Optimize the case of one listener. Don't need the extra array object.
      existing = events[type] = listener;
      ++target._eventsCount;
    } else {
      if (typeof existing === 'function') {
        // Adding the second element, need to change to array.
        existing = events[type] = prepend ? [listener, existing] :
                                            [existing, listener];
      } else {
        // If we've already got an array, just append.
        if (prepend) {
          existing.unshift(listener);
        } else {
          existing.push(listener);
        }
      }

      // Check for listener leak
      if (!existing.warned) {
        m = $getMaxListeners(target);
        if (m && m > 0 && existing.length > m) {
          existing.warned = true;
          var w = new Error('Possible EventEmitter memory leak detected. ' +
                              existing.length + ' ' + type + ' listeners added. ' +
                              'Use emitter.setMaxListeners() to increase limit');
          w.name = 'MaxListenersExceededWarning';
          w.emitter = target;
          w.type = type;
          w.count = existing.length;
          emitWarning(w);
        }
      }
    }

    return target;
  }
  function emitWarning(e) {
    typeof console.warn === 'function' ? console.warn(e) : console.log(e);
  }
  EventEmitter.prototype.addListener = function addListener(type, listener) {
    return _addListener(this, type, listener, false);
  };

  EventEmitter.prototype.on = EventEmitter.prototype.addListener;

  EventEmitter.prototype.prependListener =
      function prependListener(type, listener) {
        return _addListener(this, type, listener, true);
      };

  function _onceWrap(target, type, listener) {
    var fired = false;
    function g() {
      target.removeListener(type, g);
      if (!fired) {
        fired = true;
        listener.apply(target, arguments);
      }
    }
    g.listener = listener;
    return g;
  }

  EventEmitter.prototype.once = function once(type, listener) {
    if (typeof listener !== 'function')
      throw new TypeError('"listener" argument must be a function');
    this.on(type, _onceWrap(this, type, listener));
    return this;
  };

  EventEmitter.prototype.prependOnceListener =
      function prependOnceListener(type, listener) {
        if (typeof listener !== 'function')
          throw new TypeError('"listener" argument must be a function');
        this.prependListener(type, _onceWrap(this, type, listener));
        return this;
      };

  // emits a 'removeListener' event iff the listener was removed
  EventEmitter.prototype.removeListener =
      function removeListener(type, listener) {
        var list, events, position, i, originalListener;

        if (typeof listener !== 'function')
          throw new TypeError('"listener" argument must be a function');

        events = this._events;
        if (!events)
          return this;

        list = events[type];
        if (!list)
          return this;

        if (list === listener || (list.listener && list.listener === listener)) {
          if (--this._eventsCount === 0)
            this._events = new EventHandlers();
          else {
            delete events[type];
            if (events.removeListener)
              this.emit('removeListener', type, list.listener || listener);
          }
        } else if (typeof list !== 'function') {
          position = -1;

          for (i = list.length; i-- > 0;) {
            if (list[i] === listener ||
                (list[i].listener && list[i].listener === listener)) {
              originalListener = list[i].listener;
              position = i;
              break;
            }
          }

          if (position < 0)
            return this;

          if (list.length === 1) {
            list[0] = undefined;
            if (--this._eventsCount === 0) {
              this._events = new EventHandlers();
              return this;
            } else {
              delete events[type];
            }
          } else {
            spliceOne(list, position);
          }

          if (events.removeListener)
            this.emit('removeListener', type, originalListener || listener);
        }

        return this;
      };

  EventEmitter.prototype.removeAllListeners =
      function removeAllListeners(type) {
        var listeners, events;

        events = this._events;
        if (!events)
          return this;

        // not listening for removeListener, no need to emit
        if (!events.removeListener) {
          if (arguments.length === 0) {
            this._events = new EventHandlers();
            this._eventsCount = 0;
          } else if (events[type]) {
            if (--this._eventsCount === 0)
              this._events = new EventHandlers();
            else
              delete events[type];
          }
          return this;
        }

        // emit removeListener for all listeners on all events
        if (arguments.length === 0) {
          var keys = Object.keys(events);
          for (var i = 0, key; i < keys.length; ++i) {
            key = keys[i];
            if (key === 'removeListener') continue;
            this.removeAllListeners(key);
          }
          this.removeAllListeners('removeListener');
          this._events = new EventHandlers();
          this._eventsCount = 0;
          return this;
        }

        listeners = events[type];

        if (typeof listeners === 'function') {
          this.removeListener(type, listeners);
        } else if (listeners) {
          // LIFO order
          do {
            this.removeListener(type, listeners[listeners.length - 1]);
          } while (listeners[0]);
        }

        return this;
      };

  EventEmitter.prototype.listeners = function listeners(type) {
    var evlistener;
    var ret;
    var events = this._events;

    if (!events)
      ret = [];
    else {
      evlistener = events[type];
      if (!evlistener)
        ret = [];
      else if (typeof evlistener === 'function')
        ret = [evlistener.listener || evlistener];
      else
        ret = unwrapListeners(evlistener);
    }

    return ret;
  };

  EventEmitter.listenerCount = function(emitter, type) {
    if (typeof emitter.listenerCount === 'function') {
      return emitter.listenerCount(type);
    } else {
      return listenerCount$1.call(emitter, type);
    }
  };

  EventEmitter.prototype.listenerCount = listenerCount$1;
  function listenerCount$1(type) {
    var events = this._events;

    if (events) {
      var evlistener = events[type];

      if (typeof evlistener === 'function') {
        return 1;
      } else if (evlistener) {
        return evlistener.length;
      }
    }

    return 0;
  }

  EventEmitter.prototype.eventNames = function eventNames() {
    return this._eventsCount > 0 ? Reflect.ownKeys(this._events) : [];
  };

  // About 1.5x faster than the two-arg version of Array#splice().
  function spliceOne(list, index) {
    for (var i = index, k = i + 1, n = list.length; k < n; i += 1, k += 1)
      list[i] = list[k];
    list.pop();
  }

  function arrayClone(arr, i) {
    var copy = new Array(i);
    while (i--)
      copy[i] = arr[i];
    return copy;
  }

  function unwrapListeners(arr) {
    var ret = new Array(arr.length);
    for (var i = 0; i < ret.length; ++i) {
      ret[i] = arr[i].listener || arr[i];
    }
    return ret;
  }

  function BufferList() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  BufferList.prototype.push = function (v) {
    var entry = { data: v, next: null };
    if (this.length > 0) this.tail.next = entry;else this.head = entry;
    this.tail = entry;
    ++this.length;
  };

  BufferList.prototype.unshift = function (v) {
    var entry = { data: v, next: this.head };
    if (this.length === 0) this.tail = entry;
    this.head = entry;
    ++this.length;
  };

  BufferList.prototype.shift = function () {
    if (this.length === 0) return;
    var ret = this.head.data;
    if (this.length === 1) this.head = this.tail = null;else this.head = this.head.next;
    --this.length;
    return ret;
  };

  BufferList.prototype.clear = function () {
    this.head = this.tail = null;
    this.length = 0;
  };

  BufferList.prototype.join = function (s) {
    if (this.length === 0) return '';
    var p = this.head;
    var ret = '' + p.data;
    while (p = p.next) {
      ret += s + p.data;
    }return ret;
  };

  BufferList.prototype.concat = function (n) {
    if (this.length === 0) return Buffer.alloc(0);
    if (this.length === 1) return this.head.data;
    var ret = Buffer.allocUnsafe(n >>> 0);
    var p = this.head;
    var i = 0;
    while (p) {
      p.data.copy(ret, i);
      i += p.data.length;
      p = p.next;
    }
    return ret;
  };

  // Copyright Joyent, Inc. and other Node contributors.
  var isBufferEncoding = Buffer.isEncoding
    || function(encoding) {
         switch (encoding && encoding.toLowerCase()) {
           case 'hex': case 'utf8': case 'utf-8': case 'ascii': case 'binary': case 'base64': case 'ucs2': case 'ucs-2': case 'utf16le': case 'utf-16le': case 'raw': return true;
           default: return false;
         }
       };


  function assertEncoding(encoding) {
    if (encoding && !isBufferEncoding(encoding)) {
      throw new Error('Unknown encoding: ' + encoding);
    }
  }

  // StringDecoder provides an interface for efficiently splitting a series of
  // buffers into a series of JS strings without breaking apart multi-byte
  // characters. CESU-8 is handled as part of the UTF-8 encoding.
  //
  // @TODO Handling all encodings inside a single object makes it very difficult
  // to reason about this code, so it should be split up in the future.
  // @TODO There should be a utf8-strict encoding that rejects invalid UTF-8 code
  // points as used by CESU-8.
  function StringDecoder(encoding) {
    this.encoding = (encoding || 'utf8').toLowerCase().replace(/[-_]/, '');
    assertEncoding(encoding);
    switch (this.encoding) {
      case 'utf8':
        // CESU-8 represents each of Surrogate Pair by 3-bytes
        this.surrogateSize = 3;
        break;
      case 'ucs2':
      case 'utf16le':
        // UTF-16 represents each of Surrogate Pair by 2-bytes
        this.surrogateSize = 2;
        this.detectIncompleteChar = utf16DetectIncompleteChar;
        break;
      case 'base64':
        // Base-64 stores 3 bytes in 4 chars, and pads the remainder.
        this.surrogateSize = 3;
        this.detectIncompleteChar = base64DetectIncompleteChar;
        break;
      default:
        this.write = passThroughWrite;
        return;
    }

    // Enough space to store all bytes of a single character. UTF-8 needs 4
    // bytes, but CESU-8 may require up to 6 (3 bytes per surrogate).
    this.charBuffer = new Buffer(6);
    // Number of bytes received for the current incomplete multi-byte character.
    this.charReceived = 0;
    // Number of bytes expected for the current incomplete multi-byte character.
    this.charLength = 0;
  }

  // write decodes the given buffer and returns it as JS string that is
  // guaranteed to not contain any partial multi-byte characters. Any partial
  // character found at the end of the buffer is buffered up, and will be
  // returned when calling write again with the remaining bytes.
  //
  // Note: Converting a Buffer containing an orphan surrogate to a String
  // currently works, but converting a String to a Buffer (via `new Buffer`, or
  // Buffer#write) will replace incomplete surrogates with the unicode
  // replacement character. See https://codereview.chromium.org/121173009/ .
  StringDecoder.prototype.write = function(buffer) {
    var charStr = '';
    // if our last write ended with an incomplete multibyte character
    while (this.charLength) {
      // determine how many remaining bytes this buffer has to offer for this char
      var available = (buffer.length >= this.charLength - this.charReceived) ?
          this.charLength - this.charReceived :
          buffer.length;

      // add the new bytes to the char buffer
      buffer.copy(this.charBuffer, this.charReceived, 0, available);
      this.charReceived += available;

      if (this.charReceived < this.charLength) {
        // still not enough chars in this buffer? wait for more ...
        return '';
      }

      // remove bytes belonging to the current character from the buffer
      buffer = buffer.slice(available, buffer.length);

      // get the character that was split
      charStr = this.charBuffer.slice(0, this.charLength).toString(this.encoding);

      // CESU-8: lead surrogate (D800-DBFF) is also the incomplete character
      var charCode = charStr.charCodeAt(charStr.length - 1);
      if (charCode >= 0xD800 && charCode <= 0xDBFF) {
        this.charLength += this.surrogateSize;
        charStr = '';
        continue;
      }
      this.charReceived = this.charLength = 0;

      // if there are no more bytes in this buffer, just emit our char
      if (buffer.length === 0) {
        return charStr;
      }
      break;
    }

    // determine and set charLength / charReceived
    this.detectIncompleteChar(buffer);

    var end = buffer.length;
    if (this.charLength) {
      // buffer the incomplete character bytes we got
      buffer.copy(this.charBuffer, 0, buffer.length - this.charReceived, end);
      end -= this.charReceived;
    }

    charStr += buffer.toString(this.encoding, 0, end);

    var end = charStr.length - 1;
    var charCode = charStr.charCodeAt(end);
    // CESU-8: lead surrogate (D800-DBFF) is also the incomplete character
    if (charCode >= 0xD800 && charCode <= 0xDBFF) {
      var size = this.surrogateSize;
      this.charLength += size;
      this.charReceived += size;
      this.charBuffer.copy(this.charBuffer, size, 0, size);
      buffer.copy(this.charBuffer, 0, 0, size);
      return charStr.substring(0, end);
    }

    // or just emit the charStr
    return charStr;
  };

  // detectIncompleteChar determines if there is an incomplete UTF-8 character at
  // the end of the given buffer. If so, it sets this.charLength to the byte
  // length that character, and sets this.charReceived to the number of bytes
  // that are available for this character.
  StringDecoder.prototype.detectIncompleteChar = function(buffer) {
    // determine how many bytes we have to check at the end of this buffer
    var i = (buffer.length >= 3) ? 3 : buffer.length;

    // Figure out if one of the last i bytes of our buffer announces an
    // incomplete char.
    for (; i > 0; i--) {
      var c = buffer[buffer.length - i];

      // See http://en.wikipedia.org/wiki/UTF-8#Description

      // 110XXXXX
      if (i == 1 && c >> 5 == 0x06) {
        this.charLength = 2;
        break;
      }

      // 1110XXXX
      if (i <= 2 && c >> 4 == 0x0E) {
        this.charLength = 3;
        break;
      }

      // 11110XXX
      if (i <= 3 && c >> 3 == 0x1E) {
        this.charLength = 4;
        break;
      }
    }
    this.charReceived = i;
  };

  StringDecoder.prototype.end = function(buffer) {
    var res = '';
    if (buffer && buffer.length)
      res = this.write(buffer);

    if (this.charReceived) {
      var cr = this.charReceived;
      var buf = this.charBuffer;
      var enc = this.encoding;
      res += buf.slice(0, cr).toString(enc);
    }

    return res;
  };

  function passThroughWrite(buffer) {
    return buffer.toString(this.encoding);
  }

  function utf16DetectIncompleteChar(buffer) {
    this.charReceived = buffer.length % 2;
    this.charLength = this.charReceived ? 2 : 0;
  }

  function base64DetectIncompleteChar(buffer) {
    this.charReceived = buffer.length % 3;
    this.charLength = this.charReceived ? 3 : 0;
  }

  Readable.ReadableState = ReadableState;

  var debug$1 = debuglog('stream');
  inherits$1(Readable, EventEmitter);

  function prependListener(emitter, event, fn) {
    // Sadly this is not cacheable as some libraries bundle their own
    // event emitter implementation with them.
    if (typeof emitter.prependListener === 'function') {
      return emitter.prependListener(event, fn);
    } else {
      // This is a hack to make sure that our error handler is attached before any
      // userland ones.  NEVER DO THIS. This is here only because this code needs
      // to continue to work with older versions of Node.js that do not include
      // the prependListener() method. The goal is to eventually remove this hack.
      if (!emitter._events || !emitter._events[event])
        emitter.on(event, fn);
      else if (Array.isArray(emitter._events[event]))
        emitter._events[event].unshift(fn);
      else
        emitter._events[event] = [fn, emitter._events[event]];
    }
  }
  function listenerCount (emitter, type) {
    return emitter.listeners(type).length;
  }
  function ReadableState(options, stream) {

    options = options || {};

    // object stream flag. Used to make read(n) ignore n and to
    // make all the buffer merging and length checks go away
    this.objectMode = !!options.objectMode;

    if (stream instanceof Duplex) this.objectMode = this.objectMode || !!options.readableObjectMode;

    // the point at which it stops calling _read() to fill the buffer
    // Note: 0 is a valid value, means "don't call _read preemptively ever"
    var hwm = options.highWaterMark;
    var defaultHwm = this.objectMode ? 16 : 16 * 1024;
    this.highWaterMark = hwm || hwm === 0 ? hwm : defaultHwm;

    // cast to ints.
    this.highWaterMark = ~ ~this.highWaterMark;

    // A linked list is used to store data chunks instead of an array because the
    // linked list can remove elements from the beginning faster than
    // array.shift()
    this.buffer = new BufferList();
    this.length = 0;
    this.pipes = null;
    this.pipesCount = 0;
    this.flowing = null;
    this.ended = false;
    this.endEmitted = false;
    this.reading = false;

    // a flag to be able to tell if the onwrite cb is called immediately,
    // or on a later tick.  We set this to true at first, because any
    // actions that shouldn't happen until "later" should generally also
    // not happen before the first write call.
    this.sync = true;

    // whenever we return null, then we set a flag to say
    // that we're awaiting a 'readable' event emission.
    this.needReadable = false;
    this.emittedReadable = false;
    this.readableListening = false;
    this.resumeScheduled = false;

    // Crypto is kind of old and crusty.  Historically, its default string
    // encoding is 'binary' so we have to make this configurable.
    // Everything else in the universe uses 'utf8', though.
    this.defaultEncoding = options.defaultEncoding || 'utf8';

    // when piping, we only care about 'readable' events that happen
    // after read()ing all the bytes and not getting any pushback.
    this.ranOut = false;

    // the number of writers that are awaiting a drain event in .pipe()s
    this.awaitDrain = 0;

    // if true, a maybeReadMore has been scheduled
    this.readingMore = false;

    this.decoder = null;
    this.encoding = null;
    if (options.encoding) {
      this.decoder = new StringDecoder(options.encoding);
      this.encoding = options.encoding;
    }
  }
  function Readable(options) {

    if (!(this instanceof Readable)) return new Readable(options);

    this._readableState = new ReadableState(options, this);

    // legacy
    this.readable = true;

    if (options && typeof options.read === 'function') this._read = options.read;

    EventEmitter.call(this);
  }

  // Manually shove something into the read() buffer.
  // This returns true if the highWaterMark has not been hit yet,
  // similar to how Writable.write() returns true if you should
  // write() some more.
  Readable.prototype.push = function (chunk, encoding) {
    var state = this._readableState;

    if (!state.objectMode && typeof chunk === 'string') {
      encoding = encoding || state.defaultEncoding;
      if (encoding !== state.encoding) {
        chunk = Buffer.from(chunk, encoding);
        encoding = '';
      }
    }

    return readableAddChunk(this, state, chunk, encoding, false);
  };

  // Unshift should *always* be something directly out of read()
  Readable.prototype.unshift = function (chunk) {
    var state = this._readableState;
    return readableAddChunk(this, state, chunk, '', true);
  };

  Readable.prototype.isPaused = function () {
    return this._readableState.flowing === false;
  };

  function readableAddChunk(stream, state, chunk, encoding, addToFront) {
    var er = chunkInvalid(state, chunk);
    if (er) {
      stream.emit('error', er);
    } else if (chunk === null) {
      state.reading = false;
      onEofChunk(stream, state);
    } else if (state.objectMode || chunk && chunk.length > 0) {
      if (state.ended && !addToFront) {
        var e = new Error('stream.push() after EOF');
        stream.emit('error', e);
      } else if (state.endEmitted && addToFront) {
        var _e = new Error('stream.unshift() after end event');
        stream.emit('error', _e);
      } else {
        var skipAdd;
        if (state.decoder && !addToFront && !encoding) {
          chunk = state.decoder.write(chunk);
          skipAdd = !state.objectMode && chunk.length === 0;
        }

        if (!addToFront) state.reading = false;

        // Don't add to the buffer if we've decoded to an empty string chunk and
        // we're not in object mode
        if (!skipAdd) {
          // if we want the data now, just emit it.
          if (state.flowing && state.length === 0 && !state.sync) {
            stream.emit('data', chunk);
            stream.read(0);
          } else {
            // update the buffer info.
            state.length += state.objectMode ? 1 : chunk.length;
            if (addToFront) state.buffer.unshift(chunk);else state.buffer.push(chunk);

            if (state.needReadable) emitReadable(stream);
          }
        }

        maybeReadMore(stream, state);
      }
    } else if (!addToFront) {
      state.reading = false;
    }

    return needMoreData(state);
  }

  // if it's past the high water mark, we can push in some more.
  // Also, if we have no data yet, we can stand some
  // more bytes.  This is to work around cases where hwm=0,
  // such as the repl.  Also, if the push() triggered a
  // readable event, and the user called read(largeNumber) such that
  // needReadable was set, then we ought to push more, so that another
  // 'readable' event will be triggered.
  function needMoreData(state) {
    return !state.ended && (state.needReadable || state.length < state.highWaterMark || state.length === 0);
  }

  // backwards compatibility.
  Readable.prototype.setEncoding = function (enc) {
    this._readableState.decoder = new StringDecoder(enc);
    this._readableState.encoding = enc;
    return this;
  };

  // Don't raise the hwm > 8MB
  var MAX_HWM = 0x800000;
  function computeNewHighWaterMark(n) {
    if (n >= MAX_HWM) {
      n = MAX_HWM;
    } else {
      // Get the next highest power of 2 to prevent increasing hwm excessively in
      // tiny amounts
      n--;
      n |= n >>> 1;
      n |= n >>> 2;
      n |= n >>> 4;
      n |= n >>> 8;
      n |= n >>> 16;
      n++;
    }
    return n;
  }

  // This function is designed to be inlinable, so please take care when making
  // changes to the function body.
  function howMuchToRead(n, state) {
    if (n <= 0 || state.length === 0 && state.ended) return 0;
    if (state.objectMode) return 1;
    if (n !== n) {
      // Only flow one buffer at a time
      if (state.flowing && state.length) return state.buffer.head.data.length;else return state.length;
    }
    // If we're asking for more than the current hwm, then raise the hwm.
    if (n > state.highWaterMark) state.highWaterMark = computeNewHighWaterMark(n);
    if (n <= state.length) return n;
    // Don't have enough
    if (!state.ended) {
      state.needReadable = true;
      return 0;
    }
    return state.length;
  }

  // you can override either this method, or the async _read(n) below.
  Readable.prototype.read = function (n) {
    debug$1('read', n);
    n = parseInt(n, 10);
    var state = this._readableState;
    var nOrig = n;

    if (n !== 0) state.emittedReadable = false;

    // if we're doing read(0) to trigger a readable event, but we
    // already have a bunch of data in the buffer, then just trigger
    // the 'readable' event and move on.
    if (n === 0 && state.needReadable && (state.length >= state.highWaterMark || state.ended)) {
      debug$1('read: emitReadable', state.length, state.ended);
      if (state.length === 0 && state.ended) endReadable(this);else emitReadable(this);
      return null;
    }

    n = howMuchToRead(n, state);

    // if we've ended, and we're now clear, then finish it up.
    if (n === 0 && state.ended) {
      if (state.length === 0) endReadable(this);
      return null;
    }

    // All the actual chunk generation logic needs to be
    // *below* the call to _read.  The reason is that in certain
    // synthetic stream cases, such as passthrough streams, _read
    // may be a completely synchronous operation which may change
    // the state of the read buffer, providing enough data when
    // before there was *not* enough.
    //
    // So, the steps are:
    // 1. Figure out what the state of things will be after we do
    // a read from the buffer.
    //
    // 2. If that resulting state will trigger a _read, then call _read.
    // Note that this may be asynchronous, or synchronous.  Yes, it is
    // deeply ugly to write APIs this way, but that still doesn't mean
    // that the Readable class should behave improperly, as streams are
    // designed to be sync/async agnostic.
    // Take note if the _read call is sync or async (ie, if the read call
    // has returned yet), so that we know whether or not it's safe to emit
    // 'readable' etc.
    //
    // 3. Actually pull the requested chunks out of the buffer and return.

    // if we need a readable event, then we need to do some reading.
    var doRead = state.needReadable;
    debug$1('need readable', doRead);

    // if we currently have less than the highWaterMark, then also read some
    if (state.length === 0 || state.length - n < state.highWaterMark) {
      doRead = true;
      debug$1('length less than watermark', doRead);
    }

    // however, if we've ended, then there's no point, and if we're already
    // reading, then it's unnecessary.
    if (state.ended || state.reading) {
      doRead = false;
      debug$1('reading or ended', doRead);
    } else if (doRead) {
      debug$1('do read');
      state.reading = true;
      state.sync = true;
      // if the length is currently zero, then we *need* a readable event.
      if (state.length === 0) state.needReadable = true;
      // call internal read method
      this._read(state.highWaterMark);
      state.sync = false;
      // If _read pushed data synchronously, then `reading` will be false,
      // and we need to re-evaluate how much data we can return to the user.
      if (!state.reading) n = howMuchToRead(nOrig, state);
    }

    var ret;
    if (n > 0) ret = fromList(n, state);else ret = null;

    if (ret === null) {
      state.needReadable = true;
      n = 0;
    } else {
      state.length -= n;
    }

    if (state.length === 0) {
      // If we have nothing in the buffer, then we want to know
      // as soon as we *do* get something into the buffer.
      if (!state.ended) state.needReadable = true;

      // If we tried to read() past the EOF, then emit end on the next tick.
      if (nOrig !== n && state.ended) endReadable(this);
    }

    if (ret !== null) this.emit('data', ret);

    return ret;
  };

  function chunkInvalid(state, chunk) {
    var er = null;
    if (!Buffer.isBuffer(chunk) && typeof chunk !== 'string' && chunk !== null && chunk !== undefined && !state.objectMode) {
      er = new TypeError('Invalid non-string/buffer chunk');
    }
    return er;
  }

  function onEofChunk(stream, state) {
    if (state.ended) return;
    if (state.decoder) {
      var chunk = state.decoder.end();
      if (chunk && chunk.length) {
        state.buffer.push(chunk);
        state.length += state.objectMode ? 1 : chunk.length;
      }
    }
    state.ended = true;

    // emit 'readable' now to make sure it gets picked up.
    emitReadable(stream);
  }

  // Don't emit readable right away in sync mode, because this can trigger
  // another read() call => stack overflow.  This way, it might trigger
  // a nextTick recursion warning, but that's not so bad.
  function emitReadable(stream) {
    var state = stream._readableState;
    state.needReadable = false;
    if (!state.emittedReadable) {
      debug$1('emitReadable', state.flowing);
      state.emittedReadable = true;
      if (state.sync) nextTick(emitReadable_, stream);else emitReadable_(stream);
    }
  }

  function emitReadable_(stream) {
    debug$1('emit readable');
    stream.emit('readable');
    flow(stream);
  }

  // at this point, the user has presumably seen the 'readable' event,
  // and called read() to consume some data.  that may have triggered
  // in turn another _read(n) call, in which case reading = true if
  // it's in progress.
  // However, if we're not ended, or reading, and the length < hwm,
  // then go ahead and try to read some more preemptively.
  function maybeReadMore(stream, state) {
    if (!state.readingMore) {
      state.readingMore = true;
      nextTick(maybeReadMore_, stream, state);
    }
  }

  function maybeReadMore_(stream, state) {
    var len = state.length;
    while (!state.reading && !state.flowing && !state.ended && state.length < state.highWaterMark) {
      debug$1('maybeReadMore read 0');
      stream.read(0);
      if (len === state.length)
        // didn't get any data, stop spinning.
        break;else len = state.length;
    }
    state.readingMore = false;
  }

  // abstract method.  to be overridden in specific implementation classes.
  // call cb(er, data) where data is <= n in length.
  // for virtual (non-string, non-buffer) streams, "length" is somewhat
  // arbitrary, and perhaps not very meaningful.
  Readable.prototype._read = function (n) {
    this.emit('error', new Error('not implemented'));
  };

  Readable.prototype.pipe = function (dest, pipeOpts) {
    var src = this;
    var state = this._readableState;

    switch (state.pipesCount) {
      case 0:
        state.pipes = dest;
        break;
      case 1:
        state.pipes = [state.pipes, dest];
        break;
      default:
        state.pipes.push(dest);
        break;
    }
    state.pipesCount += 1;
    debug$1('pipe count=%d opts=%j', state.pipesCount, pipeOpts);

    var doEnd = (!pipeOpts || pipeOpts.end !== false);

    var endFn = doEnd ? onend : cleanup;
    if (state.endEmitted) nextTick(endFn);else src.once('end', endFn);

    dest.on('unpipe', onunpipe);
    function onunpipe(readable) {
      debug$1('onunpipe');
      if (readable === src) {
        cleanup();
      }
    }

    function onend() {
      debug$1('onend');
      dest.end();
    }

    // when the dest drains, it reduces the awaitDrain counter
    // on the source.  This would be more elegant with a .once()
    // handler in flow(), but adding and removing repeatedly is
    // too slow.
    var ondrain = pipeOnDrain(src);
    dest.on('drain', ondrain);

    var cleanedUp = false;
    function cleanup() {
      debug$1('cleanup');
      // cleanup event handlers once the pipe is broken
      dest.removeListener('close', onclose);
      dest.removeListener('finish', onfinish);
      dest.removeListener('drain', ondrain);
      dest.removeListener('error', onerror);
      dest.removeListener('unpipe', onunpipe);
      src.removeListener('end', onend);
      src.removeListener('end', cleanup);
      src.removeListener('data', ondata);

      cleanedUp = true;

      // if the reader is waiting for a drain event from this
      // specific writer, then it would cause it to never start
      // flowing again.
      // So, if this is awaiting a drain, then we just call it now.
      // If we don't know, then assume that we are waiting for one.
      if (state.awaitDrain && (!dest._writableState || dest._writableState.needDrain)) ondrain();
    }

    // If the user pushes more data while we're writing to dest then we'll end up
    // in ondata again. However, we only want to increase awaitDrain once because
    // dest will only emit one 'drain' event for the multiple writes.
    // => Introduce a guard on increasing awaitDrain.
    var increasedAwaitDrain = false;
    src.on('data', ondata);
    function ondata(chunk) {
      debug$1('ondata');
      increasedAwaitDrain = false;
      var ret = dest.write(chunk);
      if (false === ret && !increasedAwaitDrain) {
        // If the user unpiped during `dest.write()`, it is possible
        // to get stuck in a permanently paused state if that write
        // also returned false.
        // => Check whether `dest` is still a piping destination.
        if ((state.pipesCount === 1 && state.pipes === dest || state.pipesCount > 1 && indexOf(state.pipes, dest) !== -1) && !cleanedUp) {
          debug$1('false write response, pause', src._readableState.awaitDrain);
          src._readableState.awaitDrain++;
          increasedAwaitDrain = true;
        }
        src.pause();
      }
    }

    // if the dest has an error, then stop piping into it.
    // however, don't suppress the throwing behavior for this.
    function onerror(er) {
      debug$1('onerror', er);
      unpipe();
      dest.removeListener('error', onerror);
      if (listenerCount(dest, 'error') === 0) dest.emit('error', er);
    }

    // Make sure our error handler is attached before userland ones.
    prependListener(dest, 'error', onerror);

    // Both close and finish should trigger unpipe, but only once.
    function onclose() {
      dest.removeListener('finish', onfinish);
      unpipe();
    }
    dest.once('close', onclose);
    function onfinish() {
      debug$1('onfinish');
      dest.removeListener('close', onclose);
      unpipe();
    }
    dest.once('finish', onfinish);

    function unpipe() {
      debug$1('unpipe');
      src.unpipe(dest);
    }

    // tell the dest that it's being piped to
    dest.emit('pipe', src);

    // start the flow if it hasn't been started already.
    if (!state.flowing) {
      debug$1('pipe resume');
      src.resume();
    }

    return dest;
  };

  function pipeOnDrain(src) {
    return function () {
      var state = src._readableState;
      debug$1('pipeOnDrain', state.awaitDrain);
      if (state.awaitDrain) state.awaitDrain--;
      if (state.awaitDrain === 0 && src.listeners('data').length) {
        state.flowing = true;
        flow(src);
      }
    };
  }

  Readable.prototype.unpipe = function (dest) {
    var state = this._readableState;

    // if we're not piping anywhere, then do nothing.
    if (state.pipesCount === 0) return this;

    // just one destination.  most common case.
    if (state.pipesCount === 1) {
      // passed in one, but it's not the right one.
      if (dest && dest !== state.pipes) return this;

      if (!dest) dest = state.pipes;

      // got a match.
      state.pipes = null;
      state.pipesCount = 0;
      state.flowing = false;
      if (dest) dest.emit('unpipe', this);
      return this;
    }

    // slow case. multiple pipe destinations.

    if (!dest) {
      // remove all.
      var dests = state.pipes;
      var len = state.pipesCount;
      state.pipes = null;
      state.pipesCount = 0;
      state.flowing = false;

      for (var _i = 0; _i < len; _i++) {
        dests[_i].emit('unpipe', this);
      }return this;
    }

    // try to find the right one.
    var i = indexOf(state.pipes, dest);
    if (i === -1) return this;

    state.pipes.splice(i, 1);
    state.pipesCount -= 1;
    if (state.pipesCount === 1) state.pipes = state.pipes[0];

    dest.emit('unpipe', this);

    return this;
  };

  // set up data events if they are asked for
  // Ensure readable listeners eventually get something
  Readable.prototype.on = function (ev, fn) {
    var res = EventEmitter.prototype.on.call(this, ev, fn);

    if (ev === 'data') {
      // Start flowing on next tick if stream isn't explicitly paused
      if (this._readableState.flowing !== false) this.resume();
    } else if (ev === 'readable') {
      var state = this._readableState;
      if (!state.endEmitted && !state.readableListening) {
        state.readableListening = state.needReadable = true;
        state.emittedReadable = false;
        if (!state.reading) {
          nextTick(nReadingNextTick, this);
        } else if (state.length) {
          emitReadable(this);
        }
      }
    }

    return res;
  };
  Readable.prototype.addListener = Readable.prototype.on;

  function nReadingNextTick(self) {
    debug$1('readable nexttick read 0');
    self.read(0);
  }

  // pause() and resume() are remnants of the legacy readable stream API
  // If the user uses them, then switch into old mode.
  Readable.prototype.resume = function () {
    var state = this._readableState;
    if (!state.flowing) {
      debug$1('resume');
      state.flowing = true;
      resume(this, state);
    }
    return this;
  };

  function resume(stream, state) {
    if (!state.resumeScheduled) {
      state.resumeScheduled = true;
      nextTick(resume_, stream, state);
    }
  }

  function resume_(stream, state) {
    if (!state.reading) {
      debug$1('resume read 0');
      stream.read(0);
    }

    state.resumeScheduled = false;
    state.awaitDrain = 0;
    stream.emit('resume');
    flow(stream);
    if (state.flowing && !state.reading) stream.read(0);
  }

  Readable.prototype.pause = function () {
    debug$1('call pause flowing=%j', this._readableState.flowing);
    if (false !== this._readableState.flowing) {
      debug$1('pause');
      this._readableState.flowing = false;
      this.emit('pause');
    }
    return this;
  };

  function flow(stream) {
    var state = stream._readableState;
    debug$1('flow', state.flowing);
    while (state.flowing && stream.read() !== null) {}
  }

  // wrap an old-style stream as the async data source.
  // This is *not* part of the readable stream interface.
  // It is an ugly unfortunate mess of history.
  Readable.prototype.wrap = function (stream) {
    var state = this._readableState;
    var paused = false;

    var self = this;
    stream.on('end', function () {
      debug$1('wrapped end');
      if (state.decoder && !state.ended) {
        var chunk = state.decoder.end();
        if (chunk && chunk.length) self.push(chunk);
      }

      self.push(null);
    });

    stream.on('data', function (chunk) {
      debug$1('wrapped data');
      if (state.decoder) chunk = state.decoder.write(chunk);

      // don't skip over falsy values in objectMode
      if (state.objectMode && (chunk === null || chunk === undefined)) return;else if (!state.objectMode && (!chunk || !chunk.length)) return;

      var ret = self.push(chunk);
      if (!ret) {
        paused = true;
        stream.pause();
      }
    });

    // proxy all the other methods.
    // important when wrapping filters and duplexes.
    for (var i in stream) {
      if (this[i] === undefined && typeof stream[i] === 'function') {
        this[i] = function (method) {
          return function () {
            return stream[method].apply(stream, arguments);
          };
        }(i);
      }
    }

    // proxy certain important events.
    var events = ['error', 'close', 'destroy', 'pause', 'resume'];
    forEach(events, function (ev) {
      stream.on(ev, self.emit.bind(self, ev));
    });

    // when we try to consume some more bytes, simply unpause the
    // underlying stream.
    self._read = function (n) {
      debug$1('wrapped _read', n);
      if (paused) {
        paused = false;
        stream.resume();
      }
    };

    return self;
  };

  // exposed for testing purposes only.
  Readable._fromList = fromList;

  // Pluck off n bytes from an array of buffers.
  // Length is the combined lengths of all the buffers in the list.
  // This function is designed to be inlinable, so please take care when making
  // changes to the function body.
  function fromList(n, state) {
    // nothing buffered
    if (state.length === 0) return null;

    var ret;
    if (state.objectMode) ret = state.buffer.shift();else if (!n || n >= state.length) {
      // read it all, truncate the list
      if (state.decoder) ret = state.buffer.join('');else if (state.buffer.length === 1) ret = state.buffer.head.data;else ret = state.buffer.concat(state.length);
      state.buffer.clear();
    } else {
      // read part of list
      ret = fromListPartial(n, state.buffer, state.decoder);
    }

    return ret;
  }

  // Extracts only enough buffered data to satisfy the amount requested.
  // This function is designed to be inlinable, so please take care when making
  // changes to the function body.
  function fromListPartial(n, list, hasStrings) {
    var ret;
    if (n < list.head.data.length) {
      // slice is the same for buffers and strings
      ret = list.head.data.slice(0, n);
      list.head.data = list.head.data.slice(n);
    } else if (n === list.head.data.length) {
      // first chunk is a perfect match
      ret = list.shift();
    } else {
      // result spans more than one buffer
      ret = hasStrings ? copyFromBufferString(n, list) : copyFromBuffer(n, list);
    }
    return ret;
  }

  // Copies a specified amount of characters from the list of buffered data
  // chunks.
  // This function is designed to be inlinable, so please take care when making
  // changes to the function body.
  function copyFromBufferString(n, list) {
    var p = list.head;
    var c = 1;
    var ret = p.data;
    n -= ret.length;
    while (p = p.next) {
      var str = p.data;
      var nb = n > str.length ? str.length : n;
      if (nb === str.length) ret += str;else ret += str.slice(0, n);
      n -= nb;
      if (n === 0) {
        if (nb === str.length) {
          ++c;
          if (p.next) list.head = p.next;else list.head = list.tail = null;
        } else {
          list.head = p;
          p.data = str.slice(nb);
        }
        break;
      }
      ++c;
    }
    list.length -= c;
    return ret;
  }

  // Copies a specified amount of bytes from the list of buffered data chunks.
  // This function is designed to be inlinable, so please take care when making
  // changes to the function body.
  function copyFromBuffer(n, list) {
    var ret = Buffer.allocUnsafe(n);
    var p = list.head;
    var c = 1;
    p.data.copy(ret);
    n -= p.data.length;
    while (p = p.next) {
      var buf = p.data;
      var nb = n > buf.length ? buf.length : n;
      buf.copy(ret, ret.length - n, 0, nb);
      n -= nb;
      if (n === 0) {
        if (nb === buf.length) {
          ++c;
          if (p.next) list.head = p.next;else list.head = list.tail = null;
        } else {
          list.head = p;
          p.data = buf.slice(nb);
        }
        break;
      }
      ++c;
    }
    list.length -= c;
    return ret;
  }

  function endReadable(stream) {
    var state = stream._readableState;

    // If we get here before consuming all the bytes, then that is a
    // bug in node.  Should never happen.
    if (state.length > 0) throw new Error('"endReadable()" called on non-empty stream');

    if (!state.endEmitted) {
      state.ended = true;
      nextTick(endReadableNT, state, stream);
    }
  }

  function endReadableNT(state, stream) {
    // Check that we didn't get one last unshift.
    if (!state.endEmitted && state.length === 0) {
      state.endEmitted = true;
      stream.readable = false;
      stream.emit('end');
    }
  }

  function forEach(xs, f) {
    for (var i = 0, l = xs.length; i < l; i++) {
      f(xs[i], i);
    }
  }

  function indexOf(xs, x) {
    for (var i = 0, l = xs.length; i < l; i++) {
      if (xs[i] === x) return i;
    }
    return -1;
  }

  // A bit simpler than readable streams.
  Writable$1.WritableState = WritableState;
  inherits$1(Writable$1, EventEmitter);

  function nop() {}

  function WriteReq(chunk, encoding, cb) {
    this.chunk = chunk;
    this.encoding = encoding;
    this.callback = cb;
    this.next = null;
  }

  function WritableState(options, stream) {
    Object.defineProperty(this, 'buffer', {
      get: deprecate(function () {
        return this.getBuffer();
      }, '_writableState.buffer is deprecated. Use _writableState.getBuffer ' + 'instead.')
    });
    options = options || {};

    // object stream flag to indicate whether or not this stream
    // contains buffers or objects.
    this.objectMode = !!options.objectMode;

    if (stream instanceof Duplex) this.objectMode = this.objectMode || !!options.writableObjectMode;

    // the point at which write() starts returning false
    // Note: 0 is a valid value, means that we always return false if
    // the entire buffer is not flushed immediately on write()
    var hwm = options.highWaterMark;
    var defaultHwm = this.objectMode ? 16 : 16 * 1024;
    this.highWaterMark = hwm || hwm === 0 ? hwm : defaultHwm;

    // cast to ints.
    this.highWaterMark = ~ ~this.highWaterMark;

    this.needDrain = false;
    // at the start of calling end()
    this.ending = false;
    // when end() has been called, and returned
    this.ended = false;
    // when 'finish' is emitted
    this.finished = false;

    // should we decode strings into buffers before passing to _write?
    // this is here so that some node-core streams can optimize string
    // handling at a lower level.
    var noDecode = options.decodeStrings === false;
    this.decodeStrings = !noDecode;

    // Crypto is kind of old and crusty.  Historically, its default string
    // encoding is 'binary' so we have to make this configurable.
    // Everything else in the universe uses 'utf8', though.
    this.defaultEncoding = options.defaultEncoding || 'utf8';

    // not an actual buffer we keep track of, but a measurement
    // of how much we're waiting to get pushed to some underlying
    // socket or file.
    this.length = 0;

    // a flag to see when we're in the middle of a write.
    this.writing = false;

    // when true all writes will be buffered until .uncork() call
    this.corked = 0;

    // a flag to be able to tell if the onwrite cb is called immediately,
    // or on a later tick.  We set this to true at first, because any
    // actions that shouldn't happen until "later" should generally also
    // not happen before the first write call.
    this.sync = true;

    // a flag to know if we're processing previously buffered items, which
    // may call the _write() callback in the same tick, so that we don't
    // end up in an overlapped onwrite situation.
    this.bufferProcessing = false;

    // the callback that's passed to _write(chunk,cb)
    this.onwrite = function (er) {
      onwrite(stream, er);
    };

    // the callback that the user supplies to write(chunk,encoding,cb)
    this.writecb = null;

    // the amount that is being written when _write is called.
    this.writelen = 0;

    this.bufferedRequest = null;
    this.lastBufferedRequest = null;

    // number of pending user-supplied write callbacks
    // this must be 0 before 'finish' can be emitted
    this.pendingcb = 0;

    // emit prefinish if the only thing we're waiting for is _write cbs
    // This is relevant for synchronous Transform streams
    this.prefinished = false;

    // True if the error was already emitted and should not be thrown again
    this.errorEmitted = false;

    // count buffered requests
    this.bufferedRequestCount = 0;

    // allocate the first CorkedRequest, there is always
    // one allocated and free to use, and we maintain at most two
    this.corkedRequestsFree = new CorkedRequest(this);
  }

  WritableState.prototype.getBuffer = function writableStateGetBuffer() {
    var current = this.bufferedRequest;
    var out = [];
    while (current) {
      out.push(current);
      current = current.next;
    }
    return out;
  };
  function Writable$1(options) {

    // Writable ctor is applied to Duplexes, though they're not
    // instanceof Writable, they're instanceof Readable.
    if (!(this instanceof Writable$1) && !(this instanceof Duplex)) return new Writable$1(options);

    this._writableState = new WritableState(options, this);

    // legacy.
    this.writable = true;

    if (options) {
      if (typeof options.write === 'function') this._write = options.write;

      if (typeof options.writev === 'function') this._writev = options.writev;
    }

    EventEmitter.call(this);
  }

  // Otherwise people can pipe Writable streams, which is just wrong.
  Writable$1.prototype.pipe = function () {
    this.emit('error', new Error('Cannot pipe, not readable'));
  };

  function writeAfterEnd(stream, cb) {
    var er = new Error('write after end');
    // TODO: defer error events consistently everywhere, not just the cb
    stream.emit('error', er);
    nextTick(cb, er);
  }

  // If we get something that is not a buffer, string, null, or undefined,
  // and we're not in objectMode, then that's an error.
  // Otherwise stream chunks are all considered to be of length=1, and the
  // watermarks determine how many objects to keep in the buffer, rather than
  // how many bytes or characters.
  function validChunk(stream, state, chunk, cb) {
    var valid = true;
    var er = false;
    // Always throw error if a null is written
    // if we are not in object mode then throw
    // if it is not a buffer, string, or undefined.
    if (chunk === null) {
      er = new TypeError('May not write null values to stream');
    } else if (!Buffer.isBuffer(chunk) && typeof chunk !== 'string' && chunk !== undefined && !state.objectMode) {
      er = new TypeError('Invalid non-string/buffer chunk');
    }
    if (er) {
      stream.emit('error', er);
      nextTick(cb, er);
      valid = false;
    }
    return valid;
  }

  Writable$1.prototype.write = function (chunk, encoding, cb) {
    var state = this._writableState;
    var ret = false;

    if (typeof encoding === 'function') {
      cb = encoding;
      encoding = null;
    }

    if (Buffer.isBuffer(chunk)) encoding = 'buffer';else if (!encoding) encoding = state.defaultEncoding;

    if (typeof cb !== 'function') cb = nop;

    if (state.ended) writeAfterEnd(this, cb);else if (validChunk(this, state, chunk, cb)) {
      state.pendingcb++;
      ret = writeOrBuffer(this, state, chunk, encoding, cb);
    }

    return ret;
  };

  Writable$1.prototype.cork = function () {
    var state = this._writableState;

    state.corked++;
  };

  Writable$1.prototype.uncork = function () {
    var state = this._writableState;

    if (state.corked) {
      state.corked--;

      if (!state.writing && !state.corked && !state.finished && !state.bufferProcessing && state.bufferedRequest) clearBuffer(this, state);
    }
  };

  Writable$1.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
    // node::ParseEncoding() requires lower case.
    if (typeof encoding === 'string') encoding = encoding.toLowerCase();
    if (!(['hex', 'utf8', 'utf-8', 'ascii', 'binary', 'base64', 'ucs2', 'ucs-2', 'utf16le', 'utf-16le', 'raw'].indexOf((encoding + '').toLowerCase()) > -1)) throw new TypeError('Unknown encoding: ' + encoding);
    this._writableState.defaultEncoding = encoding;
    return this;
  };

  function decodeChunk(state, chunk, encoding) {
    if (!state.objectMode && state.decodeStrings !== false && typeof chunk === 'string') {
      chunk = Buffer.from(chunk, encoding);
    }
    return chunk;
  }

  // if we're already writing something, then just put this
  // in the queue, and wait our turn.  Otherwise, call _write
  // If we return false, then we need a drain event, so set that flag.
  function writeOrBuffer(stream, state, chunk, encoding, cb) {
    chunk = decodeChunk(state, chunk, encoding);

    if (Buffer.isBuffer(chunk)) encoding = 'buffer';
    var len = state.objectMode ? 1 : chunk.length;

    state.length += len;

    var ret = state.length < state.highWaterMark;
    // we must ensure that previous needDrain will not be reset to false.
    if (!ret) state.needDrain = true;

    if (state.writing || state.corked) {
      var last = state.lastBufferedRequest;
      state.lastBufferedRequest = new WriteReq(chunk, encoding, cb);
      if (last) {
        last.next = state.lastBufferedRequest;
      } else {
        state.bufferedRequest = state.lastBufferedRequest;
      }
      state.bufferedRequestCount += 1;
    } else {
      doWrite(stream, state, false, len, chunk, encoding, cb);
    }

    return ret;
  }

  function doWrite(stream, state, writev, len, chunk, encoding, cb) {
    state.writelen = len;
    state.writecb = cb;
    state.writing = true;
    state.sync = true;
    if (writev) stream._writev(chunk, state.onwrite);else stream._write(chunk, encoding, state.onwrite);
    state.sync = false;
  }

  function onwriteError(stream, state, sync, er, cb) {
    --state.pendingcb;
    if (sync) nextTick(cb, er);else cb(er);

    stream._writableState.errorEmitted = true;
    stream.emit('error', er);
  }

  function onwriteStateUpdate(state) {
    state.writing = false;
    state.writecb = null;
    state.length -= state.writelen;
    state.writelen = 0;
  }

  function onwrite(stream, er) {
    var state = stream._writableState;
    var sync = state.sync;
    var cb = state.writecb;

    onwriteStateUpdate(state);

    if (er) onwriteError(stream, state, sync, er, cb);else {
      // Check if we're actually ready to finish, but don't emit yet
      var finished = needFinish(state);

      if (!finished && !state.corked && !state.bufferProcessing && state.bufferedRequest) {
        clearBuffer(stream, state);
      }

      if (sync) {
        /*<replacement>*/
          nextTick(afterWrite, stream, state, finished, cb);
        /*</replacement>*/
      } else {
          afterWrite(stream, state, finished, cb);
        }
    }
  }

  function afterWrite(stream, state, finished, cb) {
    if (!finished) onwriteDrain(stream, state);
    state.pendingcb--;
    cb();
    finishMaybe(stream, state);
  }

  // Must force callback to be called on nextTick, so that we don't
  // emit 'drain' before the write() consumer gets the 'false' return
  // value, and has a chance to attach a 'drain' listener.
  function onwriteDrain(stream, state) {
    if (state.length === 0 && state.needDrain) {
      state.needDrain = false;
      stream.emit('drain');
    }
  }

  // if there's something in the buffer waiting, then process it
  function clearBuffer(stream, state) {
    state.bufferProcessing = true;
    var entry = state.bufferedRequest;

    if (stream._writev && entry && entry.next) {
      // Fast case, write everything using _writev()
      var l = state.bufferedRequestCount;
      var buffer = new Array(l);
      var holder = state.corkedRequestsFree;
      holder.entry = entry;

      var count = 0;
      while (entry) {
        buffer[count] = entry;
        entry = entry.next;
        count += 1;
      }

      doWrite(stream, state, true, state.length, buffer, '', holder.finish);

      // doWrite is almost always async, defer these to save a bit of time
      // as the hot path ends with doWrite
      state.pendingcb++;
      state.lastBufferedRequest = null;
      if (holder.next) {
        state.corkedRequestsFree = holder.next;
        holder.next = null;
      } else {
        state.corkedRequestsFree = new CorkedRequest(state);
      }
    } else {
      // Slow case, write chunks one-by-one
      while (entry) {
        var chunk = entry.chunk;
        var encoding = entry.encoding;
        var cb = entry.callback;
        var len = state.objectMode ? 1 : chunk.length;

        doWrite(stream, state, false, len, chunk, encoding, cb);
        entry = entry.next;
        // if we didn't call the onwrite immediately, then
        // it means that we need to wait until it does.
        // also, that means that the chunk and cb are currently
        // being processed, so move the buffer counter past them.
        if (state.writing) {
          break;
        }
      }

      if (entry === null) state.lastBufferedRequest = null;
    }

    state.bufferedRequestCount = 0;
    state.bufferedRequest = entry;
    state.bufferProcessing = false;
  }

  Writable$1.prototype._write = function (chunk, encoding, cb) {
    cb(new Error('not implemented'));
  };

  Writable$1.prototype._writev = null;

  Writable$1.prototype.end = function (chunk, encoding, cb) {
    var state = this._writableState;

    if (typeof chunk === 'function') {
      cb = chunk;
      chunk = null;
      encoding = null;
    } else if (typeof encoding === 'function') {
      cb = encoding;
      encoding = null;
    }

    if (chunk !== null && chunk !== undefined) this.write(chunk, encoding);

    // .end() fully uncorks
    if (state.corked) {
      state.corked = 1;
      this.uncork();
    }

    // ignore unnecessary end() calls.
    if (!state.ending && !state.finished) endWritable(this, state, cb);
  };

  function needFinish(state) {
    return state.ending && state.length === 0 && state.bufferedRequest === null && !state.finished && !state.writing;
  }

  function prefinish(stream, state) {
    if (!state.prefinished) {
      state.prefinished = true;
      stream.emit('prefinish');
    }
  }

  function finishMaybe(stream, state) {
    var need = needFinish(state);
    if (need) {
      if (state.pendingcb === 0) {
        prefinish(stream, state);
        state.finished = true;
        stream.emit('finish');
      } else {
        prefinish(stream, state);
      }
    }
    return need;
  }

  function endWritable(stream, state, cb) {
    state.ending = true;
    finishMaybe(stream, state);
    if (cb) {
      if (state.finished) nextTick(cb);else stream.once('finish', cb);
    }
    state.ended = true;
    stream.writable = false;
  }

  // It seems a linked list but it is not
  // there will be only 2 of these for each stream
  function CorkedRequest(state) {
    var _this = this;

    this.next = null;
    this.entry = null;

    this.finish = function (err) {
      var entry = _this.entry;
      _this.entry = null;
      while (entry) {
        var cb = entry.callback;
        state.pendingcb--;
        cb(err);
        entry = entry.next;
      }
      if (state.corkedRequestsFree) {
        state.corkedRequestsFree.next = _this;
      } else {
        state.corkedRequestsFree = _this;
      }
    };
  }

  inherits$1(Duplex, Readable);

  var keys = Object.keys(Writable$1.prototype);
  for (var v = 0; v < keys.length; v++) {
    var method = keys[v];
    if (!Duplex.prototype[method]) Duplex.prototype[method] = Writable$1.prototype[method];
  }
  function Duplex(options) {
    if (!(this instanceof Duplex)) return new Duplex(options);

    Readable.call(this, options);
    Writable$1.call(this, options);

    if (options && options.readable === false) this.readable = false;

    if (options && options.writable === false) this.writable = false;

    this.allowHalfOpen = true;
    if (options && options.allowHalfOpen === false) this.allowHalfOpen = false;

    this.once('end', onend);
  }

  // the no-half-open enforcer
  function onend() {
    // if we allow half-open state, or if the writable side ended,
    // then we're ok.
    if (this.allowHalfOpen || this._writableState.ended) return;

    // no more data can be written.
    // But allow more writes to happen in this tick.
    nextTick(onEndNT, this);
  }

  function onEndNT(self) {
    self.end();
  }

  // a transform stream is a readable/writable stream where you do
  inherits$1(Transform, Duplex);

  function TransformState(stream) {
    this.afterTransform = function (er, data) {
      return afterTransform(stream, er, data);
    };

    this.needTransform = false;
    this.transforming = false;
    this.writecb = null;
    this.writechunk = null;
    this.writeencoding = null;
  }

  function afterTransform(stream, er, data) {
    var ts = stream._transformState;
    ts.transforming = false;

    var cb = ts.writecb;

    if (!cb) return stream.emit('error', new Error('no writecb in Transform class'));

    ts.writechunk = null;
    ts.writecb = null;

    if (data !== null && data !== undefined) stream.push(data);

    cb(er);

    var rs = stream._readableState;
    rs.reading = false;
    if (rs.needReadable || rs.length < rs.highWaterMark) {
      stream._read(rs.highWaterMark);
    }
  }
  function Transform(options) {
    if (!(this instanceof Transform)) return new Transform(options);

    Duplex.call(this, options);

    this._transformState = new TransformState(this);

    // when the writable side finishes, then flush out anything remaining.
    var stream = this;

    // start out asking for a readable event once data is transformed.
    this._readableState.needReadable = true;

    // we have implemented the _read method, and done the other things
    // that Readable wants before the first _read call, so unset the
    // sync guard flag.
    this._readableState.sync = false;

    if (options) {
      if (typeof options.transform === 'function') this._transform = options.transform;

      if (typeof options.flush === 'function') this._flush = options.flush;
    }

    this.once('prefinish', function () {
      if (typeof this._flush === 'function') this._flush(function (er) {
        done(stream, er);
      });else done(stream);
    });
  }

  Transform.prototype.push = function (chunk, encoding) {
    this._transformState.needTransform = false;
    return Duplex.prototype.push.call(this, chunk, encoding);
  };

  // This is the part where you do stuff!
  // override this function in implementation classes.
  // 'chunk' is an input chunk.
  //
  // Call `push(newChunk)` to pass along transformed output
  // to the readable side.  You may call 'push' zero or more times.
  //
  // Call `cb(err)` when you are done with this chunk.  If you pass
  // an error, then that'll put the hurt on the whole operation.  If you
  // never call cb(), then you'll never get another chunk.
  Transform.prototype._transform = function (chunk, encoding, cb) {
    throw new Error('Not implemented');
  };

  Transform.prototype._write = function (chunk, encoding, cb) {
    var ts = this._transformState;
    ts.writecb = cb;
    ts.writechunk = chunk;
    ts.writeencoding = encoding;
    if (!ts.transforming) {
      var rs = this._readableState;
      if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark) this._read(rs.highWaterMark);
    }
  };

  // Doesn't matter what the args are here.
  // _transform does all the work.
  // That we got here means that the readable side wants more data.
  Transform.prototype._read = function (n) {
    var ts = this._transformState;

    if (ts.writechunk !== null && ts.writecb && !ts.transforming) {
      ts.transforming = true;
      this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
    } else {
      // mark that we need a transform, so that any data that comes in
      // will get processed, now that we've asked for it.
      ts.needTransform = true;
    }
  };

  function done(stream, er) {
    if (er) return stream.emit('error', er);

    // if there's nothing in the write buffer, then that means
    // that nothing more will ever be provided
    var ws = stream._writableState;
    var ts = stream._transformState;

    if (ws.length) throw new Error('Calling transform done when ws.length != 0');

    if (ts.transforming) throw new Error('Calling transform done when still transforming');

    return stream.push(null);
  }

  inherits$1(PassThrough, Transform);
  function PassThrough(options) {
    if (!(this instanceof PassThrough)) return new PassThrough(options);

    Transform.call(this, options);
  }

  PassThrough.prototype._transform = function (chunk, encoding, cb) {
    cb(null, chunk);
  };

  inherits$1(Stream, EventEmitter);
  Stream.Readable = Readable;
  Stream.Writable = Writable$1;
  Stream.Duplex = Duplex;
  Stream.Transform = Transform;
  Stream.PassThrough = PassThrough;

  // Backwards-compat with node 0.4.x
  Stream.Stream = Stream;

  // old-style streams.  Note that the pipe method (the only relevant
  // part of this class) is overridden in the Readable class.

  function Stream() {
    EventEmitter.call(this);
  }

  Stream.prototype.pipe = function(dest, options) {
    var source = this;

    function ondata(chunk) {
      if (dest.writable) {
        if (false === dest.write(chunk) && source.pause) {
          source.pause();
        }
      }
    }

    source.on('data', ondata);

    function ondrain() {
      if (source.readable && source.resume) {
        source.resume();
      }
    }

    dest.on('drain', ondrain);

    // If the 'end' option is not supplied, dest.end() will be called when
    // source gets the 'end' or 'close' events.  Only dest.end() once.
    if (!dest._isStdio && (!options || options.end !== false)) {
      source.on('end', onend);
      source.on('close', onclose);
    }

    var didOnEnd = false;
    function onend() {
      if (didOnEnd) return;
      didOnEnd = true;

      dest.end();
    }


    function onclose() {
      if (didOnEnd) return;
      didOnEnd = true;

      if (typeof dest.destroy === 'function') dest.destroy();
    }

    // don't leave dangling pipes when there are errors.
    function onerror(er) {
      cleanup();
      if (EventEmitter.listenerCount(this, 'error') === 0) {
        throw er; // Unhandled stream error in pipe.
      }
    }

    source.on('error', onerror);
    dest.on('error', onerror);

    // remove all the event listeners that were added.
    function cleanup() {
      source.removeListener('data', ondata);
      dest.removeListener('drain', ondrain);

      source.removeListener('end', onend);
      source.removeListener('close', onclose);

      source.removeListener('error', onerror);
      dest.removeListener('error', onerror);

      source.removeListener('end', cleanup);
      source.removeListener('close', cleanup);

      dest.removeListener('close', cleanup);
    }

    source.on('end', cleanup);
    source.on('close', cleanup);

    dest.on('close', cleanup);

    dest.emit('pipe', source);

    // Allow for unix-like usage: A.pipe(B).pipe(C)
    return dest;
  };

  var stream = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': Stream,
    Readable: Readable,
    Writable: Writable$1,
    Duplex: Duplex,
    Transform: Transform,
    PassThrough: PassThrough,
    Stream: Stream
  });

  var rStates = {
    UNSENT: 0,
    OPENED: 1,
    HEADERS_RECEIVED: 2,
    LOADING: 3,
    DONE: 4
  };
  function IncomingMessage(xhr, response, mode) {
    var self = this;
    Readable.call(self);

    self._mode = mode;
    self.headers = {};
    self.rawHeaders = [];
    self.trailers = {};
    self.rawTrailers = [];

    // Fake the 'close' event, but only once 'end' fires
    self.on('end', function() {
      // The nextTick is necessary to prevent the 'request' module from causing an infinite loop
      process.nextTick(function() {
        self.emit('close');
      });
    });
    var read;
    if (mode === 'fetch') {
      self._fetchResponse = response;

      self.url = response.url;
      self.statusCode = response.status;
      self.statusMessage = response.statusText;
        // backwards compatible version of for (<item> of <iterable>):
        // for (var <item>,_i,_it = <iterable>[Symbol.iterator](); <item> = (_i = _it.next()).value,!_i.done;)
      for (var header, _i, _it = response.headers[Symbol.iterator](); header = (_i = _it.next()).value, !_i.done;) {
        self.headers[header[0].toLowerCase()] = header[1];
        self.rawHeaders.push(header[0], header[1]);
      }

      // TODO: this doesn't respect backpressure. Once WritableStream is available, this can be fixed
      var reader = response.body.getReader();

      read = function () {
        reader.read().then(function(result) {
          if (self._destroyed)
            return
          if (result.done) {
            self.push(null);
            return
          }
          self.push(new Buffer(result.value));
          read();
        });
      };
      read();

    } else {
      self._xhr = xhr;
      self._pos = 0;

      self.url = xhr.responseURL;
      self.statusCode = xhr.status;
      self.statusMessage = xhr.statusText;
      var headers = xhr.getAllResponseHeaders().split(/\r?\n/);
      headers.forEach(function(header) {
        var matches = header.match(/^([^:]+):\s*(.*)/);
        if (matches) {
          var key = matches[1].toLowerCase();
          if (key === 'set-cookie') {
            if (self.headers[key] === undefined) {
              self.headers[key] = [];
            }
            self.headers[key].push(matches[2]);
          } else if (self.headers[key] !== undefined) {
            self.headers[key] += ', ' + matches[2];
          } else {
            self.headers[key] = matches[2];
          }
          self.rawHeaders.push(matches[1], matches[2]);
        }
      });

      self._charset = 'x-user-defined';
      if (!overrideMimeType) {
        var mimeType = self.rawHeaders['mime-type'];
        if (mimeType) {
          var charsetMatch = mimeType.match(/;\s*charset=([^;])(;|$)/);
          if (charsetMatch) {
            self._charset = charsetMatch[1].toLowerCase();
          }
        }
        if (!self._charset)
          self._charset = 'utf-8'; // best guess
      }
    }
  }

  inherits$1(IncomingMessage, Readable);

  IncomingMessage.prototype._read = function() {};

  IncomingMessage.prototype._onXHRProgress = function() {
    var self = this;

    var xhr = self._xhr;

    var response = null;
    switch (self._mode) {
    case 'text:vbarray': // For IE9
      if (xhr.readyState !== rStates.DONE)
        break
      try {
        // This fails in IE8
        response = new global$1.VBArray(xhr.responseBody).toArray();
      } catch (e) {
        // pass
      }
      if (response !== null) {
        self.push(new Buffer(response));
        break
      }
      // Falls through in IE8
    case 'text':
      try { // This will fail when readyState = 3 in IE9. Switch mode and wait for readyState = 4
        response = xhr.responseText;
      } catch (e) {
        self._mode = 'text:vbarray';
        break
      }
      if (response.length > self._pos) {
        var newData = response.substr(self._pos);
        if (self._charset === 'x-user-defined') {
          var buffer = new Buffer(newData.length);
          for (var i = 0; i < newData.length; i++)
            buffer[i] = newData.charCodeAt(i) & 0xff;

          self.push(buffer);
        } else {
          self.push(newData, self._charset);
        }
        self._pos = response.length;
      }
      break
    case 'arraybuffer':
      if (xhr.readyState !== rStates.DONE || !xhr.response)
        break
      response = xhr.response;
      self.push(new Buffer(new Uint8Array(response)));
      break
    case 'moz-chunked-arraybuffer': // take whole
      response = xhr.response;
      if (xhr.readyState !== rStates.LOADING || !response)
        break
      self.push(new Buffer(new Uint8Array(response)));
      break
    case 'ms-stream':
      response = xhr.response;
      if (xhr.readyState !== rStates.LOADING)
        break
      var reader = new global$1.MSStreamReader();
      reader.onprogress = function() {
        if (reader.result.byteLength > self._pos) {
          self.push(new Buffer(new Uint8Array(reader.result.slice(self._pos))));
          self._pos = reader.result.byteLength;
        }
      };
      reader.onload = function() {
        self.push(null);
      };
        // reader.onerror = ??? // TODO: this
      reader.readAsArrayBuffer(response);
      break
    }

    // The ms-stream case handles end separately in reader.onload()
    if (self._xhr.readyState === rStates.DONE && self._mode !== 'ms-stream') {
      self.push(null);
    }
  };

  // from https://github.com/jhiesey/to-arraybuffer/blob/6502d9850e70ba7935a7df4ad86b358fc216f9f0/index.js
  function toArrayBuffer (buf) {
    // If the buffer is backed by a Uint8Array, a faster version will work
    if (buf instanceof Uint8Array) {
      // If the buffer isn't a subarray, return the underlying ArrayBuffer
      if (buf.byteOffset === 0 && buf.byteLength === buf.buffer.byteLength) {
        return buf.buffer
      } else if (typeof buf.buffer.slice === 'function') {
        // Otherwise we need to get a proper copy
        return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength)
      }
    }

    if (isBuffer$1(buf)) {
      // This is the slow version that will work with any Buffer
      // implementation (even in old browsers)
      var arrayCopy = new Uint8Array(buf.length);
      var len = buf.length;
      for (var i = 0; i < len; i++) {
        arrayCopy[i] = buf[i];
      }
      return arrayCopy.buffer
    } else {
      throw new Error('Argument must be a Buffer')
    }
  }

  function decideMode(preferBinary, useFetch) {
    if (hasFetch && useFetch) {
      return 'fetch'
    } else if (mozchunkedarraybuffer) {
      return 'moz-chunked-arraybuffer'
    } else if (msstream) {
      return 'ms-stream'
    } else if (arraybuffer && preferBinary) {
      return 'arraybuffer'
    } else if (vbArray && preferBinary) {
      return 'text:vbarray'
    } else {
      return 'text'
    }
  }

  function ClientRequest(opts) {
    var self = this;
    Writable$1.call(self);

    self._opts = opts;
    self._body = [];
    self._headers = {};
    if (opts.auth)
      self.setHeader('Authorization', 'Basic ' + new Buffer(opts.auth).toString('base64'));
    Object.keys(opts.headers).forEach(function(name) {
      self.setHeader(name, opts.headers[name]);
    });

    var preferBinary;
    var useFetch = true;
    if (opts.mode === 'disable-fetch') {
      // If the use of XHR should be preferred and includes preserving the 'content-type' header
      useFetch = false;
      preferBinary = true;
    } else if (opts.mode === 'prefer-streaming') {
      // If streaming is a high priority but binary compatibility and
      // the accuracy of the 'content-type' header aren't
      preferBinary = false;
    } else if (opts.mode === 'allow-wrong-content-type') {
      // If streaming is more important than preserving the 'content-type' header
      preferBinary = !overrideMimeType;
    } else if (!opts.mode || opts.mode === 'default' || opts.mode === 'prefer-fast') {
      // Use binary if text streaming may corrupt data or the content-type header, or for speed
      preferBinary = true;
    } else {
      throw new Error('Invalid value for opts.mode')
    }
    self._mode = decideMode(preferBinary, useFetch);

    self.on('finish', function() {
      self._onFinish();
    });
  }

  inherits$1(ClientRequest, Writable$1);
  // Taken from http://www.w3.org/TR/XMLHttpRequest/#the-setrequestheader%28%29-method
  var unsafeHeaders = [
    'accept-charset',
    'accept-encoding',
    'access-control-request-headers',
    'access-control-request-method',
    'connection',
    'content-length',
    'cookie',
    'cookie2',
    'date',
    'dnt',
    'expect',
    'host',
    'keep-alive',
    'origin',
    'referer',
    'te',
    'trailer',
    'transfer-encoding',
    'upgrade',
    'user-agent',
    'via'
  ];
  ClientRequest.prototype.setHeader = function(name, value) {
    var self = this;
    var lowerName = name.toLowerCase();
      // This check is not necessary, but it prevents warnings from browsers about setting unsafe
      // headers. To be honest I'm not entirely sure hiding these warnings is a good thing, but
      // http-browserify did it, so I will too.
    if (unsafeHeaders.indexOf(lowerName) !== -1)
      return

    self._headers[lowerName] = {
      name: name,
      value: value
    };
  };

  ClientRequest.prototype.getHeader = function(name) {
    var self = this;
    return self._headers[name.toLowerCase()].value
  };

  ClientRequest.prototype.removeHeader = function(name) {
    var self = this;
    delete self._headers[name.toLowerCase()];
  };

  ClientRequest.prototype._onFinish = function() {
    var self = this;

    if (self._destroyed)
      return
    var opts = self._opts;

    var headersObj = self._headers;
    var body;
    if (opts.method === 'POST' || opts.method === 'PUT' || opts.method === 'PATCH') {
      if (blobConstructor()) {
        body = new global$1.Blob(self._body.map(function(buffer) {
          return toArrayBuffer(buffer)
        }), {
          type: (headersObj['content-type'] || {}).value || ''
        });
      } else {
        // get utf8 string
        body = Buffer.concat(self._body).toString();
      }
    }

    if (self._mode === 'fetch') {
      var headers = Object.keys(headersObj).map(function(name) {
        return [headersObj[name].name, headersObj[name].value]
      });

      global$1.fetch(self._opts.url, {
        method: self._opts.method,
        headers: headers,
        body: body,
        mode: 'cors',
        credentials: opts.withCredentials ? 'include' : 'same-origin'
      }).then(function(response) {
        self._fetchResponse = response;
        self._connect();
      }, function(reason) {
        self.emit('error', reason);
      });
    } else {
      var xhr = self._xhr = new global$1.XMLHttpRequest();
      try {
        xhr.open(self._opts.method, self._opts.url, true);
      } catch (err) {
        process.nextTick(function() {
          self.emit('error', err);
        });
        return
      }

      // Can't set responseType on really old browsers
      if ('responseType' in xhr)
        xhr.responseType = self._mode.split(':')[0];

      if ('withCredentials' in xhr)
        xhr.withCredentials = !!opts.withCredentials;

      if (self._mode === 'text' && 'overrideMimeType' in xhr)
        xhr.overrideMimeType('text/plain; charset=x-user-defined');

      Object.keys(headersObj).forEach(function(name) {
        xhr.setRequestHeader(headersObj[name].name, headersObj[name].value);
      });

      self._response = null;
      xhr.onreadystatechange = function() {
        switch (xhr.readyState) {
        case rStates.LOADING:
        case rStates.DONE:
          self._onXHRProgress();
          break
        }
      };
        // Necessary for streaming in Firefox, since xhr.response is ONLY defined
        // in onprogress, not in onreadystatechange with xhr.readyState = 3
      if (self._mode === 'moz-chunked-arraybuffer') {
        xhr.onprogress = function() {
          self._onXHRProgress();
        };
      }

      xhr.onerror = function() {
        if (self._destroyed)
          return
        self.emit('error', new Error('XHR error'));
      };

      try {
        xhr.send(body);
      } catch (err) {
        process.nextTick(function() {
          self.emit('error', err);
        });
        return
      }
    }
  };

  /**
   * Checks if xhr.status is readable and non-zero, indicating no error.
   * Even though the spec says it should be available in readyState 3,
   * accessing it throws an exception in IE8
   */
  function statusValid(xhr) {
    try {
      var status = xhr.status;
      return (status !== null && status !== 0)
    } catch (e) {
      return false
    }
  }

  ClientRequest.prototype._onXHRProgress = function() {
    var self = this;

    if (!statusValid(self._xhr) || self._destroyed)
      return

    if (!self._response)
      self._connect();

    self._response._onXHRProgress();
  };

  ClientRequest.prototype._connect = function() {
    var self = this;

    if (self._destroyed)
      return

    self._response = new IncomingMessage(self._xhr, self._fetchResponse, self._mode);
    self.emit('response', self._response);
  };

  ClientRequest.prototype._write = function(chunk, encoding, cb) {
    var self = this;

    self._body.push(chunk);
    cb();
  };

  ClientRequest.prototype.abort = ClientRequest.prototype.destroy = function() {
    var self = this;
    self._destroyed = true;
    if (self._response)
      self._response._destroyed = true;
    if (self._xhr)
      self._xhr.abort();
      // Currently, there isn't a way to truly abort a fetch.
      // If you like bikeshedding, see https://github.com/whatwg/fetch/issues/27
  };

  ClientRequest.prototype.end = function(data, encoding, cb) {
    var self = this;
    if (typeof data === 'function') {
      cb = data;
      data = undefined;
    }

    Writable$1.prototype.end.call(self, data, encoding, cb);
  };

  ClientRequest.prototype.flushHeaders = function() {};
  ClientRequest.prototype.setTimeout = function() {};
  ClientRequest.prototype.setNoDelay = function() {};
  ClientRequest.prototype.setSocketKeepAlive = function() {};

  /*! https://mths.be/punycode v1.4.1 by @mathias */


  /** Highest positive signed 32-bit float value */
  var maxInt = 2147483647; // aka. 0x7FFFFFFF or 2^31-1

  /** Bootstring parameters */
  var base = 36;
  var tMin = 1;
  var tMax = 26;
  var skew = 38;
  var damp = 700;
  var initialBias = 72;
  var initialN = 128; // 0x80
  var delimiter = '-'; // '\x2D'
  var regexNonASCII = /[^\x20-\x7E]/; // unprintable ASCII chars + non-ASCII chars
  var regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g; // RFC 3490 separators

  /** Error messages */
  var errors = {
    'overflow': 'Overflow: input needs wider integers to process',
    'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
    'invalid-input': 'Invalid input'
  };

  /** Convenience shortcuts */
  var baseMinusTMin = base - tMin;
  var floor = Math.floor;
  var stringFromCharCode = String.fromCharCode;

  /*--------------------------------------------------------------------------*/

  /**
   * A generic error utility function.
   * @private
   * @param {String} type The error type.
   * @returns {Error} Throws a `RangeError` with the applicable error message.
   */
  function error(type) {
    throw new RangeError(errors[type]);
  }

  /**
   * A generic `Array#map` utility function.
   * @private
   * @param {Array} array The array to iterate over.
   * @param {Function} callback The function that gets called for every array
   * item.
   * @returns {Array} A new array of values returned by the callback function.
   */
  function map$1(array, fn) {
    var length = array.length;
    var result = [];
    while (length--) {
      result[length] = fn(array[length]);
    }
    return result;
  }

  /**
   * A simple `Array#map`-like wrapper to work with domain name strings or email
   * addresses.
   * @private
   * @param {String} domain The domain name or email address.
   * @param {Function} callback The function that gets called for every
   * character.
   * @returns {Array} A new string of characters returned by the callback
   * function.
   */
  function mapDomain(string, fn) {
    var parts = string.split('@');
    var result = '';
    if (parts.length > 1) {
      // In email addresses, only the domain name should be punycoded. Leave
      // the local part (i.e. everything up to `@`) intact.
      result = parts[0] + '@';
      string = parts[1];
    }
    // Avoid `split(regex)` for IE8 compatibility. See #17.
    string = string.replace(regexSeparators, '\x2E');
    var labels = string.split('.');
    var encoded = map$1(labels, fn).join('.');
    return result + encoded;
  }

  /**
   * Creates an array containing the numeric code points of each Unicode
   * character in the string. While JavaScript uses UCS-2 internally,
   * this function will convert a pair of surrogate halves (each of which
   * UCS-2 exposes as separate characters) into a single code point,
   * matching UTF-16.
   * @see `punycode.ucs2.encode`
   * @see <https://mathiasbynens.be/notes/javascript-encoding>
   * @memberOf punycode.ucs2
   * @name decode
   * @param {String} string The Unicode input string (UCS-2).
   * @returns {Array} The new array of code points.
   */
  function ucs2decode(string) {
    var output = [],
      counter = 0,
      length = string.length,
      value,
      extra;
    while (counter < length) {
      value = string.charCodeAt(counter++);
      if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
        // high surrogate, and there is a next character
        extra = string.charCodeAt(counter++);
        if ((extra & 0xFC00) == 0xDC00) { // low surrogate
          output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
        } else {
          // unmatched surrogate; only append this code unit, in case the next
          // code unit is the high surrogate of a surrogate pair
          output.push(value);
          counter--;
        }
      } else {
        output.push(value);
      }
    }
    return output;
  }

  /**
   * Converts a digit/integer into a basic code point.
   * @see `basicToDigit()`
   * @private
   * @param {Number} digit The numeric value of a basic code point.
   * @returns {Number} The basic code point whose value (when used for
   * representing integers) is `digit`, which needs to be in the range
   * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
   * used; else, the lowercase form is used. The behavior is undefined
   * if `flag` is non-zero and `digit` has no uppercase form.
   */
  function digitToBasic(digit, flag) {
    //  0..25 map to ASCII a..z or A..Z
    // 26..35 map to ASCII 0..9
    return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
  }

  /**
   * Bias adaptation function as per section 3.4 of RFC 3492.
   * https://tools.ietf.org/html/rfc3492#section-3.4
   * @private
   */
  function adapt(delta, numPoints, firstTime) {
    var k = 0;
    delta = firstTime ? floor(delta / damp) : delta >> 1;
    delta += floor(delta / numPoints);
    for ( /* no initialization */ ; delta > baseMinusTMin * tMax >> 1; k += base) {
      delta = floor(delta / baseMinusTMin);
    }
    return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
  }

  /**
   * Converts a string of Unicode symbols (e.g. a domain name label) to a
   * Punycode string of ASCII-only symbols.
   * @memberOf punycode
   * @param {String} input The string of Unicode symbols.
   * @returns {String} The resulting Punycode string of ASCII-only symbols.
   */
  function encode(input) {
    var n,
      delta,
      handledCPCount,
      basicLength,
      bias,
      j,
      m,
      q,
      k,
      t,
      currentValue,
      output = [],
      /** `inputLength` will hold the number of code points in `input`. */
      inputLength,
      /** Cached calculation results */
      handledCPCountPlusOne,
      baseMinusT,
      qMinusT;

    // Convert the input in UCS-2 to Unicode
    input = ucs2decode(input);

    // Cache the length
    inputLength = input.length;

    // Initialize the state
    n = initialN;
    delta = 0;
    bias = initialBias;

    // Handle the basic code points
    for (j = 0; j < inputLength; ++j) {
      currentValue = input[j];
      if (currentValue < 0x80) {
        output.push(stringFromCharCode(currentValue));
      }
    }

    handledCPCount = basicLength = output.length;

    // `handledCPCount` is the number of code points that have been handled;
    // `basicLength` is the number of basic code points.

    // Finish the basic string - if it is not empty - with a delimiter
    if (basicLength) {
      output.push(delimiter);
    }

    // Main encoding loop:
    while (handledCPCount < inputLength) {

      // All non-basic code points < n have been handled already. Find the next
      // larger one:
      for (m = maxInt, j = 0; j < inputLength; ++j) {
        currentValue = input[j];
        if (currentValue >= n && currentValue < m) {
          m = currentValue;
        }
      }

      // Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
      // but guard against overflow
      handledCPCountPlusOne = handledCPCount + 1;
      if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
        error('overflow');
      }

      delta += (m - n) * handledCPCountPlusOne;
      n = m;

      for (j = 0; j < inputLength; ++j) {
        currentValue = input[j];

        if (currentValue < n && ++delta > maxInt) {
          error('overflow');
        }

        if (currentValue == n) {
          // Represent delta as a generalized variable-length integer
          for (q = delta, k = base; /* no condition */ ; k += base) {
            t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
            if (q < t) {
              break;
            }
            qMinusT = q - t;
            baseMinusT = base - t;
            output.push(
              stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
            );
            q = floor(qMinusT / baseMinusT);
          }

          output.push(stringFromCharCode(digitToBasic(q, 0)));
          bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
          delta = 0;
          ++handledCPCount;
        }
      }

      ++delta;
      ++n;

    }
    return output.join('');
  }

  /**
   * Converts a Unicode string representing a domain name or an email address to
   * Punycode. Only the non-ASCII parts of the domain name will be converted,
   * i.e. it doesn't matter if you call it with a domain that's already in
   * ASCII.
   * @memberOf punycode
   * @param {String} input The domain name or email address to convert, as a
   * Unicode string.
   * @returns {String} The Punycode representation of the given domain name or
   * email address.
   */
  function toASCII(input) {
    return mapDomain(input, function(string) {
      return regexNonASCII.test(string) ?
        'xn--' + encode(string) :
        string;
    });
  }

  // Copyright Joyent, Inc. and other Node contributors.
  //
  // Permission is hereby granted, free of charge, to any person obtaining a
  // copy of this software and associated documentation files (the
  // "Software"), to deal in the Software without restriction, including
  // without limitation the rights to use, copy, modify, merge, publish,
  // distribute, sublicense, and/or sell copies of the Software, and to permit
  // persons to whom the Software is furnished to do so, subject to the
  // following conditions:
  //
  // The above copyright notice and this permission notice shall be included
  // in all copies or substantial portions of the Software.
  //
  // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
  // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
  // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
  // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
  // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
  // USE OR OTHER DEALINGS IN THE SOFTWARE.


  // If obj.hasOwnProperty has been overridden, then calling
  // obj.hasOwnProperty(prop) will break.
  // See: https://github.com/joyent/node/issues/1707
  function hasOwnProperty(obj, prop) {
    return Object.prototype.hasOwnProperty.call(obj, prop);
  }
  var isArray = Array.isArray || function (xs) {
    return Object.prototype.toString.call(xs) === '[object Array]';
  };
  function stringifyPrimitive(v) {
    switch (typeof v) {
      case 'string':
        return v;

      case 'boolean':
        return v ? 'true' : 'false';

      case 'number':
        return isFinite(v) ? v : '';

      default:
        return '';
    }
  }

  function stringify (obj, sep, eq, name) {
    sep = sep || '&';
    eq = eq || '=';
    if (obj === null) {
      obj = undefined;
    }

    if (typeof obj === 'object') {
      return map(objectKeys$1(obj), function(k) {
        var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
        if (isArray(obj[k])) {
          return map(obj[k], function(v) {
            return ks + encodeURIComponent(stringifyPrimitive(v));
          }).join(sep);
        } else {
          return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
        }
      }).join(sep);

    }

    if (!name) return '';
    return encodeURIComponent(stringifyPrimitive(name)) + eq +
           encodeURIComponent(stringifyPrimitive(obj));
  }
  function map (xs, f) {
    if (xs.map) return xs.map(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
      res.push(f(xs[i], i));
    }
    return res;
  }

  var objectKeys$1 = Object.keys || function (obj) {
    var res = [];
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
    }
    return res;
  };

  function parse$2(qs, sep, eq, options) {
    sep = sep || '&';
    eq = eq || '=';
    var obj = {};

    if (typeof qs !== 'string' || qs.length === 0) {
      return obj;
    }

    var regexp = /\+/g;
    qs = qs.split(sep);

    var maxKeys = 1000;
    if (options && typeof options.maxKeys === 'number') {
      maxKeys = options.maxKeys;
    }

    var len = qs.length;
    // maxKeys <= 0 means that we should not limit keys count
    if (maxKeys > 0 && len > maxKeys) {
      len = maxKeys;
    }

    for (var i = 0; i < len; ++i) {
      var x = qs[i].replace(regexp, '%20'),
          idx = x.indexOf(eq),
          kstr, vstr, k, v;

      if (idx >= 0) {
        kstr = x.substr(0, idx);
        vstr = x.substr(idx + 1);
      } else {
        kstr = x;
        vstr = '';
      }

      k = decodeURIComponent(kstr);
      v = decodeURIComponent(vstr);

      if (!hasOwnProperty(obj, k)) {
        obj[k] = v;
      } else if (isArray(obj[k])) {
        obj[k].push(v);
      } else {
        obj[k] = [obj[k], v];
      }
    }

    return obj;
  }

  // Copyright Joyent, Inc. and other Node contributors.
  var url$1 = {
    parse: urlParse,
    resolve: urlResolve,
    resolveObject: urlResolveObject,
    format: urlFormat,
    Url: Url
  };
  function Url() {
    this.protocol = null;
    this.slashes = null;
    this.auth = null;
    this.host = null;
    this.port = null;
    this.hostname = null;
    this.hash = null;
    this.search = null;
    this.query = null;
    this.pathname = null;
    this.path = null;
    this.href = null;
  }

  // Reference: RFC 3986, RFC 1808, RFC 2396

  // define these here so at least they only have to be
  // compiled once on the first module load.
  var protocolPattern = /^([a-z0-9.+-]+:)/i,
    portPattern = /:[0-9]*$/,

    // Special case for a simple path URL
    simplePathPattern = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,

    // RFC 2396: characters reserved for delimiting URLs.
    // We actually just auto-escape these.
    delims = ['<', '>', '"', '`', ' ', '\r', '\n', '\t'],

    // RFC 2396: characters not allowed for various reasons.
    unwise = ['{', '}', '|', '\\', '^', '`'].concat(delims),

    // Allowed by RFCs, but cause of XSS attacks.  Always escape these.
    autoEscape = ['\''].concat(unwise),
    // Characters that are never ever allowed in a hostname.
    // Note that any invalid chars are also handled, but these
    // are the ones that are *expected* to be seen, so we fast-path
    // them.
    nonHostChars = ['%', '/', '?', ';', '#'].concat(autoEscape),
    hostEndingChars = ['/', '?', '#'],
    hostnameMaxLen = 255,
    hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/,
    hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
    // protocols that can allow "unsafe" and "unwise" chars.
    unsafeProtocol = {
      'javascript': true,
      'javascript:': true
    },
    // protocols that never have a hostname.
    hostlessProtocol = {
      'javascript': true,
      'javascript:': true
    },
    // protocols that always contain a // bit.
    slashedProtocol = {
      'http': true,
      'https': true,
      'ftp': true,
      'gopher': true,
      'file': true,
      'http:': true,
      'https:': true,
      'ftp:': true,
      'gopher:': true,
      'file:': true
    };

  function urlParse(url, parseQueryString, slashesDenoteHost) {
    if (url && isObject(url) && url instanceof Url) return url;

    var u = new Url;
    u.parse(url, parseQueryString, slashesDenoteHost);
    return u;
  }
  Url.prototype.parse = function(url, parseQueryString, slashesDenoteHost) {
    return parse$1(this, url, parseQueryString, slashesDenoteHost);
  };

  function parse$1(self, url, parseQueryString, slashesDenoteHost) {
    if (!isString(url)) {
      throw new TypeError('Parameter \'url\' must be a string, not ' + typeof url);
    }

    // Copy chrome, IE, opera backslash-handling behavior.
    // Back slashes before the query string get converted to forward slashes
    // See: https://code.google.com/p/chromium/issues/detail?id=25916
    var queryIndex = url.indexOf('?'),
      splitter =
      (queryIndex !== -1 && queryIndex < url.indexOf('#')) ? '?' : '#',
      uSplit = url.split(splitter),
      slashRegex = /\\/g;
    uSplit[0] = uSplit[0].replace(slashRegex, '/');
    url = uSplit.join(splitter);

    var rest = url;

    // trim before proceeding.
    // This is to support parse stuff like "  http://foo.com  \n"
    rest = rest.trim();

    if (!slashesDenoteHost && url.split('#').length === 1) {
      // Try fast path regexp
      var simplePath = simplePathPattern.exec(rest);
      if (simplePath) {
        self.path = rest;
        self.href = rest;
        self.pathname = simplePath[1];
        if (simplePath[2]) {
          self.search = simplePath[2];
          if (parseQueryString) {
            self.query = parse$2(self.search.substr(1));
          } else {
            self.query = self.search.substr(1);
          }
        } else if (parseQueryString) {
          self.search = '';
          self.query = {};
        }
        return self;
      }
    }

    var proto = protocolPattern.exec(rest);
    if (proto) {
      proto = proto[0];
      var lowerProto = proto.toLowerCase();
      self.protocol = lowerProto;
      rest = rest.substr(proto.length);
    }

    // figure out if it's got a host
    // user@server is *always* interpreted as a hostname, and url
    // resolution will treat //foo/bar as host=foo,path=bar because that's
    // how the browser resolves relative URLs.
    if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
      var slashes = rest.substr(0, 2) === '//';
      if (slashes && !(proto && hostlessProtocol[proto])) {
        rest = rest.substr(2);
        self.slashes = true;
      }
    }
    var i, hec, l, p;
    if (!hostlessProtocol[proto] &&
      (slashes || (proto && !slashedProtocol[proto]))) {

      // there's a hostname.
      // the first instance of /, ?, ;, or # ends the host.
      //
      // If there is an @ in the hostname, then non-host chars *are* allowed
      // to the left of the last @ sign, unless some host-ending character
      // comes *before* the @-sign.
      // URLs are obnoxious.
      //
      // ex:
      // http://a@b@c/ => user:a@b host:c
      // http://a@b?@c => user:a host:c path:/?@c

      // v0.12 TODO(isaacs): This is not quite how Chrome does things.
      // Review our test case against browsers more comprehensively.

      // find the first instance of any hostEndingChars
      var hostEnd = -1;
      for (i = 0; i < hostEndingChars.length; i++) {
        hec = rest.indexOf(hostEndingChars[i]);
        if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
          hostEnd = hec;
      }

      // at this point, either we have an explicit point where the
      // auth portion cannot go past, or the last @ char is the decider.
      var auth, atSign;
      if (hostEnd === -1) {
        // atSign can be anywhere.
        atSign = rest.lastIndexOf('@');
      } else {
        // atSign must be in auth portion.
        // http://a@b/c@d => host:b auth:a path:/c@d
        atSign = rest.lastIndexOf('@', hostEnd);
      }

      // Now we have a portion which is definitely the auth.
      // Pull that off.
      if (atSign !== -1) {
        auth = rest.slice(0, atSign);
        rest = rest.slice(atSign + 1);
        self.auth = decodeURIComponent(auth);
      }

      // the host is the remaining to the left of the first non-host char
      hostEnd = -1;
      for (i = 0; i < nonHostChars.length; i++) {
        hec = rest.indexOf(nonHostChars[i]);
        if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
          hostEnd = hec;
      }
      // if we still have not hit it, then the entire thing is a host.
      if (hostEnd === -1)
        hostEnd = rest.length;

      self.host = rest.slice(0, hostEnd);
      rest = rest.slice(hostEnd);

      // pull out port.
      parseHost(self);

      // we've indicated that there is a hostname,
      // so even if it's empty, it has to be present.
      self.hostname = self.hostname || '';

      // if hostname begins with [ and ends with ]
      // assume that it's an IPv6 address.
      var ipv6Hostname = self.hostname[0] === '[' &&
        self.hostname[self.hostname.length - 1] === ']';

      // validate a little.
      if (!ipv6Hostname) {
        var hostparts = self.hostname.split(/\./);
        for (i = 0, l = hostparts.length; i < l; i++) {
          var part = hostparts[i];
          if (!part) continue;
          if (!part.match(hostnamePartPattern)) {
            var newpart = '';
            for (var j = 0, k = part.length; j < k; j++) {
              if (part.charCodeAt(j) > 127) {
                // we replace non-ASCII char with a temporary placeholder
                // we need this to make sure size of hostname is not
                // broken by replacing non-ASCII by nothing
                newpart += 'x';
              } else {
                newpart += part[j];
              }
            }
            // we test again with ASCII char only
            if (!newpart.match(hostnamePartPattern)) {
              var validParts = hostparts.slice(0, i);
              var notHost = hostparts.slice(i + 1);
              var bit = part.match(hostnamePartStart);
              if (bit) {
                validParts.push(bit[1]);
                notHost.unshift(bit[2]);
              }
              if (notHost.length) {
                rest = '/' + notHost.join('.') + rest;
              }
              self.hostname = validParts.join('.');
              break;
            }
          }
        }
      }

      if (self.hostname.length > hostnameMaxLen) {
        self.hostname = '';
      } else {
        // hostnames are always lower case.
        self.hostname = self.hostname.toLowerCase();
      }

      if (!ipv6Hostname) {
        // IDNA Support: Returns a punycoded representation of "domain".
        // It only converts parts of the domain name that
        // have non-ASCII characters, i.e. it doesn't matter if
        // you call it with a domain that already is ASCII-only.
        self.hostname = toASCII(self.hostname);
      }

      p = self.port ? ':' + self.port : '';
      var h = self.hostname || '';
      self.host = h + p;
      self.href += self.host;

      // strip [ and ] from the hostname
      // the host field still retains them, though
      if (ipv6Hostname) {
        self.hostname = self.hostname.substr(1, self.hostname.length - 2);
        if (rest[0] !== '/') {
          rest = '/' + rest;
        }
      }
    }

    // now rest is set to the post-host stuff.
    // chop off any delim chars.
    if (!unsafeProtocol[lowerProto]) {

      // First, make 100% sure that any "autoEscape" chars get
      // escaped, even if encodeURIComponent doesn't think they
      // need to be.
      for (i = 0, l = autoEscape.length; i < l; i++) {
        var ae = autoEscape[i];
        if (rest.indexOf(ae) === -1)
          continue;
        var esc = encodeURIComponent(ae);
        if (esc === ae) {
          esc = escape(ae);
        }
        rest = rest.split(ae).join(esc);
      }
    }


    // chop off from the tail first.
    var hash = rest.indexOf('#');
    if (hash !== -1) {
      // got a fragment string.
      self.hash = rest.substr(hash);
      rest = rest.slice(0, hash);
    }
    var qm = rest.indexOf('?');
    if (qm !== -1) {
      self.search = rest.substr(qm);
      self.query = rest.substr(qm + 1);
      if (parseQueryString) {
        self.query = parse$2(self.query);
      }
      rest = rest.slice(0, qm);
    } else if (parseQueryString) {
      // no query string, but parseQueryString still requested
      self.search = '';
      self.query = {};
    }
    if (rest) self.pathname = rest;
    if (slashedProtocol[lowerProto] &&
      self.hostname && !self.pathname) {
      self.pathname = '/';
    }

    //to support http.request
    if (self.pathname || self.search) {
      p = self.pathname || '';
      var s = self.search || '';
      self.path = p + s;
    }

    // finally, reconstruct the href based on what has been validated.
    self.href = format(self);
    return self;
  }

  // format a parsed object into a url string
  function urlFormat(obj) {
    // ensure it's an object, and not a string url.
    // If it's an obj, this is a no-op.
    // this way, you can call url_format() on strings
    // to clean up potentially wonky urls.
    if (isString(obj)) obj = parse$1({}, obj);
    return format(obj);
  }

  function format(self) {
    var auth = self.auth || '';
    if (auth) {
      auth = encodeURIComponent(auth);
      auth = auth.replace(/%3A/i, ':');
      auth += '@';
    }

    var protocol = self.protocol || '',
      pathname = self.pathname || '',
      hash = self.hash || '',
      host = false,
      query = '';

    if (self.host) {
      host = auth + self.host;
    } else if (self.hostname) {
      host = auth + (self.hostname.indexOf(':') === -1 ?
        self.hostname :
        '[' + this.hostname + ']');
      if (self.port) {
        host += ':' + self.port;
      }
    }

    if (self.query &&
      isObject(self.query) &&
      Object.keys(self.query).length) {
      query = stringify(self.query);
    }

    var search = self.search || (query && ('?' + query)) || '';

    if (protocol && protocol.substr(-1) !== ':') protocol += ':';

    // only the slashedProtocols get the //.  Not mailto:, xmpp:, etc.
    // unless they had them to begin with.
    if (self.slashes ||
      (!protocol || slashedProtocol[protocol]) && host !== false) {
      host = '//' + (host || '');
      if (pathname && pathname.charAt(0) !== '/') pathname = '/' + pathname;
    } else if (!host) {
      host = '';
    }

    if (hash && hash.charAt(0) !== '#') hash = '#' + hash;
    if (search && search.charAt(0) !== '?') search = '?' + search;

    pathname = pathname.replace(/[?#]/g, function(match) {
      return encodeURIComponent(match);
    });
    search = search.replace('#', '%23');

    return protocol + host + pathname + search + hash;
  }

  Url.prototype.format = function() {
    return format(this);
  };

  function urlResolve(source, relative) {
    return urlParse(source, false, true).resolve(relative);
  }

  Url.prototype.resolve = function(relative) {
    return this.resolveObject(urlParse(relative, false, true)).format();
  };

  function urlResolveObject(source, relative) {
    if (!source) return relative;
    return urlParse(source, false, true).resolveObject(relative);
  }

  Url.prototype.resolveObject = function(relative) {
    if (isString(relative)) {
      var rel = new Url();
      rel.parse(relative, false, true);
      relative = rel;
    }

    var result = new Url();
    var tkeys = Object.keys(this);
    for (var tk = 0; tk < tkeys.length; tk++) {
      var tkey = tkeys[tk];
      result[tkey] = this[tkey];
    }

    // hash is always overridden, no matter what.
    // even href="" will remove it.
    result.hash = relative.hash;

    // if the relative url is empty, then there's nothing left to do here.
    if (relative.href === '') {
      result.href = result.format();
      return result;
    }

    // hrefs like //foo/bar always cut to the protocol.
    if (relative.slashes && !relative.protocol) {
      // take everything except the protocol from relative
      var rkeys = Object.keys(relative);
      for (var rk = 0; rk < rkeys.length; rk++) {
        var rkey = rkeys[rk];
        if (rkey !== 'protocol')
          result[rkey] = relative[rkey];
      }

      //urlParse appends trailing / to urls like http://www.example.com
      if (slashedProtocol[result.protocol] &&
        result.hostname && !result.pathname) {
        result.path = result.pathname = '/';
      }

      result.href = result.format();
      return result;
    }
    var relPath;
    if (relative.protocol && relative.protocol !== result.protocol) {
      // if it's a known url protocol, then changing
      // the protocol does weird things
      // first, if it's not file:, then we MUST have a host,
      // and if there was a path
      // to begin with, then we MUST have a path.
      // if it is file:, then the host is dropped,
      // because that's known to be hostless.
      // anything else is assumed to be absolute.
      if (!slashedProtocol[relative.protocol]) {
        var keys = Object.keys(relative);
        for (var v = 0; v < keys.length; v++) {
          var k = keys[v];
          result[k] = relative[k];
        }
        result.href = result.format();
        return result;
      }

      result.protocol = relative.protocol;
      if (!relative.host && !hostlessProtocol[relative.protocol]) {
        relPath = (relative.pathname || '').split('/');
        while (relPath.length && !(relative.host = relPath.shift()));
        if (!relative.host) relative.host = '';
        if (!relative.hostname) relative.hostname = '';
        if (relPath[0] !== '') relPath.unshift('');
        if (relPath.length < 2) relPath.unshift('');
        result.pathname = relPath.join('/');
      } else {
        result.pathname = relative.pathname;
      }
      result.search = relative.search;
      result.query = relative.query;
      result.host = relative.host || '';
      result.auth = relative.auth;
      result.hostname = relative.hostname || relative.host;
      result.port = relative.port;
      // to support http.request
      if (result.pathname || result.search) {
        var p = result.pathname || '';
        var s = result.search || '';
        result.path = p + s;
      }
      result.slashes = result.slashes || relative.slashes;
      result.href = result.format();
      return result;
    }

    var isSourceAbs = (result.pathname && result.pathname.charAt(0) === '/'),
      isRelAbs = (
        relative.host ||
        relative.pathname && relative.pathname.charAt(0) === '/'
      ),
      mustEndAbs = (isRelAbs || isSourceAbs ||
        (result.host && relative.pathname)),
      removeAllDots = mustEndAbs,
      srcPath = result.pathname && result.pathname.split('/') || [],
      psychotic = result.protocol && !slashedProtocol[result.protocol];
    relPath = relative.pathname && relative.pathname.split('/') || [];
    // if the url is a non-slashed url, then relative
    // links like ../.. should be able
    // to crawl up to the hostname, as well.  This is strange.
    // result.protocol has already been set by now.
    // Later on, put the first path part into the host field.
    if (psychotic) {
      result.hostname = '';
      result.port = null;
      if (result.host) {
        if (srcPath[0] === '') srcPath[0] = result.host;
        else srcPath.unshift(result.host);
      }
      result.host = '';
      if (relative.protocol) {
        relative.hostname = null;
        relative.port = null;
        if (relative.host) {
          if (relPath[0] === '') relPath[0] = relative.host;
          else relPath.unshift(relative.host);
        }
        relative.host = null;
      }
      mustEndAbs = mustEndAbs && (relPath[0] === '' || srcPath[0] === '');
    }
    var authInHost;
    if (isRelAbs) {
      // it's absolute.
      result.host = (relative.host || relative.host === '') ?
        relative.host : result.host;
      result.hostname = (relative.hostname || relative.hostname === '') ?
        relative.hostname : result.hostname;
      result.search = relative.search;
      result.query = relative.query;
      srcPath = relPath;
      // fall through to the dot-handling below.
    } else if (relPath.length) {
      // it's relative
      // throw away the existing file, and take the new path instead.
      if (!srcPath) srcPath = [];
      srcPath.pop();
      srcPath = srcPath.concat(relPath);
      result.search = relative.search;
      result.query = relative.query;
    } else if (!isNullOrUndefined(relative.search)) {
      // just pull out the search.
      // like href='?foo'.
      // Put this after the other two cases because it simplifies the booleans
      if (psychotic) {
        result.hostname = result.host = srcPath.shift();
        //occationaly the auth can get stuck only in host
        //this especially happens in cases like
        //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
        authInHost = result.host && result.host.indexOf('@') > 0 ?
          result.host.split('@') : false;
        if (authInHost) {
          result.auth = authInHost.shift();
          result.host = result.hostname = authInHost.shift();
        }
      }
      result.search = relative.search;
      result.query = relative.query;
      //to support http.request
      if (!isNull(result.pathname) || !isNull(result.search)) {
        result.path = (result.pathname ? result.pathname : '') +
          (result.search ? result.search : '');
      }
      result.href = result.format();
      return result;
    }

    if (!srcPath.length) {
      // no path at all.  easy.
      // we've already handled the other stuff above.
      result.pathname = null;
      //to support http.request
      if (result.search) {
        result.path = '/' + result.search;
      } else {
        result.path = null;
      }
      result.href = result.format();
      return result;
    }

    // if a url ENDs in . or .., then it must get a trailing slash.
    // however, if it ends in anything else non-slashy,
    // then it must NOT get a trailing slash.
    var last = srcPath.slice(-1)[0];
    var hasTrailingSlash = (
      (result.host || relative.host || srcPath.length > 1) &&
      (last === '.' || last === '..') || last === '');

    // strip single dots, resolve double dots to parent dir
    // if the path tries to go above the root, `up` ends up > 0
    var up = 0;
    for (var i = srcPath.length; i >= 0; i--) {
      last = srcPath[i];
      if (last === '.') {
        srcPath.splice(i, 1);
      } else if (last === '..') {
        srcPath.splice(i, 1);
        up++;
      } else if (up) {
        srcPath.splice(i, 1);
        up--;
      }
    }

    // if the path is allowed to go above the root, restore leading ..s
    if (!mustEndAbs && !removeAllDots) {
      for (; up--; up) {
        srcPath.unshift('..');
      }
    }

    if (mustEndAbs && srcPath[0] !== '' &&
      (!srcPath[0] || srcPath[0].charAt(0) !== '/')) {
      srcPath.unshift('');
    }

    if (hasTrailingSlash && (srcPath.join('/').substr(-1) !== '/')) {
      srcPath.push('');
    }

    var isAbsolute = srcPath[0] === '' ||
      (srcPath[0] && srcPath[0].charAt(0) === '/');

    // put the host back
    if (psychotic) {
      result.hostname = result.host = isAbsolute ? '' :
        srcPath.length ? srcPath.shift() : '';
      //occationaly the auth can get stuck only in host
      //this especially happens in cases like
      //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
      authInHost = result.host && result.host.indexOf('@') > 0 ?
        result.host.split('@') : false;
      if (authInHost) {
        result.auth = authInHost.shift();
        result.host = result.hostname = authInHost.shift();
      }
    }

    mustEndAbs = mustEndAbs || (result.host && srcPath.length);

    if (mustEndAbs && !isAbsolute) {
      srcPath.unshift('');
    }

    if (!srcPath.length) {
      result.pathname = null;
      result.path = null;
    } else {
      result.pathname = srcPath.join('/');
    }

    //to support request.http
    if (!isNull(result.pathname) || !isNull(result.search)) {
      result.path = (result.pathname ? result.pathname : '') +
        (result.search ? result.search : '');
    }
    result.auth = relative.auth || result.auth;
    result.slashes = result.slashes || relative.slashes;
    result.href = result.format();
    return result;
  };

  Url.prototype.parseHost = function() {
    return parseHost(this);
  };

  function parseHost(self) {
    var host = self.host;
    var port = portPattern.exec(host);
    if (port) {
      port = port[0];
      if (port !== ':') {
        self.port = port.substr(1);
      }
      host = host.substr(0, host.length - port.length);
    }
    if (host) self.hostname = host;
  }

  var url$2 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    parse: urlParse,
    resolve: urlResolve,
    resolveObject: urlResolveObject,
    format: urlFormat,
    'default': url$1,
    Url: Url
  });

  function request(opts, cb) {
    if (typeof opts === 'string')
      opts = urlParse(opts);


    // Normally, the page is loaded from http or https, so not specifying a protocol
    // will result in a (valid) protocol-relative url. However, this won't work if
    // the protocol is something else, like 'file:'
    var defaultProtocol = global$1.location.protocol.search(/^https?:$/) === -1 ? 'http:' : '';

    var protocol = opts.protocol || defaultProtocol;
    var host = opts.hostname || opts.host;
    var port = opts.port;
    var path = opts.path || '/';

    // Necessary for IPv6 addresses
    if (host && host.indexOf(':') !== -1)
      host = '[' + host + ']';

    // This may be a relative url. The browser should always be able to interpret it correctly.
    opts.url = (host ? (protocol + '//' + host) : '') + (port ? ':' + port : '') + path;
    opts.method = (opts.method || 'GET').toUpperCase();
    opts.headers = opts.headers || {};

    // Also valid opts.auth, opts.mode

    var req = new ClientRequest(opts);
    if (cb)
      req.on('response', cb);
    return req
  }

  function get(opts, cb) {
    var req = request(opts, cb);
    req.end();
    return req
  }

  function Agent() {}
  Agent.defaultMaxSockets = 4;

  var METHODS = [
    'CHECKOUT',
    'CONNECT',
    'COPY',
    'DELETE',
    'GET',
    'HEAD',
    'LOCK',
    'M-SEARCH',
    'MERGE',
    'MKACTIVITY',
    'MKCOL',
    'MOVE',
    'NOTIFY',
    'OPTIONS',
    'PATCH',
    'POST',
    'PROPFIND',
    'PROPPATCH',
    'PURGE',
    'PUT',
    'REPORT',
    'SEARCH',
    'SUBSCRIBE',
    'TRACE',
    'UNLOCK',
    'UNSUBSCRIBE'
  ];
  var STATUS_CODES = {
    100: 'Continue',
    101: 'Switching Protocols',
    102: 'Processing', // RFC 2518, obsoleted by RFC 4918
    200: 'OK',
    201: 'Created',
    202: 'Accepted',
    203: 'Non-Authoritative Information',
    204: 'No Content',
    205: 'Reset Content',
    206: 'Partial Content',
    207: 'Multi-Status', // RFC 4918
    300: 'Multiple Choices',
    301: 'Moved Permanently',
    302: 'Moved Temporarily',
    303: 'See Other',
    304: 'Not Modified',
    305: 'Use Proxy',
    307: 'Temporary Redirect',
    400: 'Bad Request',
    401: 'Unauthorized',
    402: 'Payment Required',
    403: 'Forbidden',
    404: 'Not Found',
    405: 'Method Not Allowed',
    406: 'Not Acceptable',
    407: 'Proxy Authentication Required',
    408: 'Request Time-out',
    409: 'Conflict',
    410: 'Gone',
    411: 'Length Required',
    412: 'Precondition Failed',
    413: 'Request Entity Too Large',
    414: 'Request-URI Too Large',
    415: 'Unsupported Media Type',
    416: 'Requested Range Not Satisfiable',
    417: 'Expectation Failed',
    418: 'I\'m a teapot', // RFC 2324
    422: 'Unprocessable Entity', // RFC 4918
    423: 'Locked', // RFC 4918
    424: 'Failed Dependency', // RFC 4918
    425: 'Unordered Collection', // RFC 4918
    426: 'Upgrade Required', // RFC 2817
    428: 'Precondition Required', // RFC 6585
    429: 'Too Many Requests', // RFC 6585
    431: 'Request Header Fields Too Large', // RFC 6585
    500: 'Internal Server Error',
    501: 'Not Implemented',
    502: 'Bad Gateway',
    503: 'Service Unavailable',
    504: 'Gateway Time-out',
    505: 'HTTP Version Not Supported',
    506: 'Variant Also Negotiates', // RFC 2295
    507: 'Insufficient Storage', // RFC 4918
    509: 'Bandwidth Limit Exceeded',
    510: 'Not Extended', // RFC 2774
    511: 'Network Authentication Required' // RFC 6585
  };

  var http$1 = {
    request,
    get,
    Agent,
    METHODS,
    STATUS_CODES
  };

  var http$2 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    request: request,
    get: get,
    Agent: Agent,
    METHODS: METHODS,
    STATUS_CODES: STATUS_CODES,
    'default': http$1
  });

  function compare(a, b) {
    if (a === b) {
      return 0;
    }

    var x = a.length;
    var y = b.length;

    for (var i = 0, len = Math.min(x, y); i < len; ++i) {
      if (a[i] !== b[i]) {
        x = a[i];
        y = b[i];
        break;
      }
    }

    if (x < y) {
      return -1;
    }
    if (y < x) {
      return 1;
    }
    return 0;
  }
  var hasOwn = Object.prototype.hasOwnProperty;

  var objectKeys = Object.keys || function (obj) {
    var keys = [];
    for (var key in obj) {
      if (hasOwn.call(obj, key)) keys.push(key);
    }
    return keys;
  };
  var pSlice = Array.prototype.slice;
  var _functionsHaveNames;
  function functionsHaveNames() {
    if (typeof _functionsHaveNames !== 'undefined') {
      return _functionsHaveNames;
    }
    return _functionsHaveNames = (function () {
      return function foo() {}.name === 'foo';
    }());
  }
  function pToString (obj) {
    return Object.prototype.toString.call(obj);
  }
  function isView(arrbuf) {
    if (isBuffer$1(arrbuf)) {
      return false;
    }
    if (typeof global$1.ArrayBuffer !== 'function') {
      return false;
    }
    if (typeof ArrayBuffer.isView === 'function') {
      return ArrayBuffer.isView(arrbuf);
    }
    if (!arrbuf) {
      return false;
    }
    if (arrbuf instanceof DataView) {
      return true;
    }
    if (arrbuf.buffer && arrbuf.buffer instanceof ArrayBuffer) {
      return true;
    }
    return false;
  }
  // 1. The assert module provides functions that throw
  // AssertionError's when particular conditions are not met. The
  // assert module must conform to the following interface.

  function assert$2(value, message) {
    if (!value) fail(value, true, message, '==', ok);
  }

  // 2. The AssertionError is defined in assert.
  // new assert.AssertionError({ message: message,
  //                             actual: actual,
  //                             expected: expected })

  var regex = /\s*function\s+([^\(\s]*)\s*/;
  // based on https://github.com/ljharb/function.prototype.name/blob/adeeeec8bfcc6068b187d7d9fb3d5bb1d3a30899/implementation.js
  function getName(func) {
    if (!isFunction(func)) {
      return;
    }
    if (functionsHaveNames()) {
      return func.name;
    }
    var str = func.toString();
    var match = str.match(regex);
    return match && match[1];
  }
  assert$2.AssertionError = AssertionError;
  function AssertionError(options) {
    this.name = 'AssertionError';
    this.actual = options.actual;
    this.expected = options.expected;
    this.operator = options.operator;
    if (options.message) {
      this.message = options.message;
      this.generatedMessage = false;
    } else {
      this.message = getMessage(this);
      this.generatedMessage = true;
    }
    var stackStartFunction = options.stackStartFunction || fail;
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, stackStartFunction);
    } else {
      // non v8 browsers so we can have a stacktrace
      var err = new Error();
      if (err.stack) {
        var out = err.stack;

        // try to strip useless frames
        var fn_name = getName(stackStartFunction);
        var idx = out.indexOf('\n' + fn_name);
        if (idx >= 0) {
          // once we have located the function frame
          // we need to strip out everything before it (and its line)
          var next_line = out.indexOf('\n', idx + 1);
          out = out.substring(next_line + 1);
        }

        this.stack = out;
      }
    }
  }

  // assert.AssertionError instanceof Error
  inherits$1(AssertionError, Error);

  function truncate(s, n) {
    if (typeof s === 'string') {
      return s.length < n ? s : s.slice(0, n);
    } else {
      return s;
    }
  }
  function inspect(something) {
    if (functionsHaveNames() || !isFunction(something)) {
      return inspect$1(something);
    }
    var rawname = getName(something);
    var name = rawname ? ': ' + rawname : '';
    return '[Function' +  name + ']';
  }
  function getMessage(self) {
    return truncate(inspect(self.actual), 128) + ' ' +
           self.operator + ' ' +
           truncate(inspect(self.expected), 128);
  }

  // At present only the three keys mentioned above are used and
  // understood by the spec. Implementations or sub modules can pass
  // other keys to the AssertionError's constructor - they will be
  // ignored.

  // 3. All of the following functions must throw an AssertionError
  // when a corresponding condition is not met, with a message that
  // may be undefined if not provided.  All assertion methods provide
  // both the actual and expected values to the assertion error for
  // display purposes.

  function fail(actual, expected, message, operator, stackStartFunction) {
    throw new AssertionError({
      message: message,
      actual: actual,
      expected: expected,
      operator: operator,
      stackStartFunction: stackStartFunction
    });
  }

  // EXTENSION! allows for well behaved errors defined elsewhere.
  assert$2.fail = fail;

  // 4. Pure assertion tests whether a value is truthy, as determined
  // by !!guard.
  // assert.ok(guard, message_opt);
  // This statement is equivalent to assert.equal(true, !!guard,
  // message_opt);. To test strictly for the value true, use
  // assert.strictEqual(true, guard, message_opt);.

  function ok(value, message) {
    if (!value) fail(value, true, message, '==', ok);
  }
  assert$2.ok = ok;

  // 5. The equality assertion tests shallow, coercive equality with
  // ==.
  // assert.equal(actual, expected, message_opt);
  assert$2.equal = equal;
  function equal(actual, expected, message) {
    if (actual != expected) fail(actual, expected, message, '==', equal);
  }

  // 6. The non-equality assertion tests for whether two objects are not equal
  // with != assert.notEqual(actual, expected, message_opt);
  assert$2.notEqual = notEqual;
  function notEqual(actual, expected, message) {
    if (actual == expected) {
      fail(actual, expected, message, '!=', notEqual);
    }
  }

  // 7. The equivalence assertion tests a deep equality relation.
  // assert.deepEqual(actual, expected, message_opt);
  assert$2.deepEqual = deepEqual;
  function deepEqual(actual, expected, message) {
    if (!_deepEqual(actual, expected, false)) {
      fail(actual, expected, message, 'deepEqual', deepEqual);
    }
  }
  assert$2.deepStrictEqual = deepStrictEqual;
  function deepStrictEqual(actual, expected, message) {
    if (!_deepEqual(actual, expected, true)) {
      fail(actual, expected, message, 'deepStrictEqual', deepStrictEqual);
    }
  }

  function _deepEqual(actual, expected, strict, memos) {
    // 7.1. All identical values are equivalent, as determined by ===.
    if (actual === expected) {
      return true;
    } else if (isBuffer$1(actual) && isBuffer$1(expected)) {
      return compare(actual, expected) === 0;

    // 7.2. If the expected value is a Date object, the actual value is
    // equivalent if it is also a Date object that refers to the same time.
    } else if (isDate(actual) && isDate(expected)) {
      return actual.getTime() === expected.getTime();

    // 7.3 If the expected value is a RegExp object, the actual value is
    // equivalent if it is also a RegExp object with the same source and
    // properties (`global`, `multiline`, `lastIndex`, `ignoreCase`).
    } else if (isRegExp(actual) && isRegExp(expected)) {
      return actual.source === expected.source &&
             actual.global === expected.global &&
             actual.multiline === expected.multiline &&
             actual.lastIndex === expected.lastIndex &&
             actual.ignoreCase === expected.ignoreCase;

    // 7.4. Other pairs that do not both pass typeof value == 'object',
    // equivalence is determined by ==.
    } else if ((actual === null || typeof actual !== 'object') &&
               (expected === null || typeof expected !== 'object')) {
      return strict ? actual === expected : actual == expected;

    // If both values are instances of typed arrays, wrap their underlying
    // ArrayBuffers in a Buffer each to increase performance
    // This optimization requires the arrays to have the same type as checked by
    // Object.prototype.toString (aka pToString). Never perform binary
    // comparisons for Float*Arrays, though, since e.g. +0 === -0 but their
    // bit patterns are not identical.
    } else if (isView(actual) && isView(expected) &&
               pToString(actual) === pToString(expected) &&
               !(actual instanceof Float32Array ||
                 actual instanceof Float64Array)) {
      return compare(new Uint8Array(actual.buffer),
                     new Uint8Array(expected.buffer)) === 0;

    // 7.5 For all other Object pairs, including Array objects, equivalence is
    // determined by having the same number of owned properties (as verified
    // with Object.prototype.hasOwnProperty.call), the same set of keys
    // (although not necessarily the same order), equivalent values for every
    // corresponding key, and an identical 'prototype' property. Note: this
    // accounts for both named and indexed properties on Arrays.
    } else if (isBuffer$1(actual) !== isBuffer$1(expected)) {
      return false;
    } else {
      memos = memos || {actual: [], expected: []};

      var actualIndex = memos.actual.indexOf(actual);
      if (actualIndex !== -1) {
        if (actualIndex === memos.expected.indexOf(expected)) {
          return true;
        }
      }

      memos.actual.push(actual);
      memos.expected.push(expected);

      return objEquiv(actual, expected, strict, memos);
    }
  }

  function isArguments(object) {
    return Object.prototype.toString.call(object) == '[object Arguments]';
  }

  function objEquiv(a, b, strict, actualVisitedObjects) {
    if (a === null || a === undefined || b === null || b === undefined)
      return false;
    // if one is a primitive, the other must be same
    if (isPrimitive(a) || isPrimitive(b))
      return a === b;
    if (strict && Object.getPrototypeOf(a) !== Object.getPrototypeOf(b))
      return false;
    var aIsArgs = isArguments(a);
    var bIsArgs = isArguments(b);
    if ((aIsArgs && !bIsArgs) || (!aIsArgs && bIsArgs))
      return false;
    if (aIsArgs) {
      a = pSlice.call(a);
      b = pSlice.call(b);
      return _deepEqual(a, b, strict);
    }
    var ka = objectKeys(a);
    var kb = objectKeys(b);
    var key, i;
    // having the same number of owned properties (keys incorporates
    // hasOwnProperty)
    if (ka.length !== kb.length)
      return false;
    //the same set of keys (although not necessarily the same order),
    ka.sort();
    kb.sort();
    //~~~cheap key test
    for (i = ka.length - 1; i >= 0; i--) {
      if (ka[i] !== kb[i])
        return false;
    }
    //equivalent values for every corresponding key, and
    //~~~possibly expensive deep test
    for (i = ka.length - 1; i >= 0; i--) {
      key = ka[i];
      if (!_deepEqual(a[key], b[key], strict, actualVisitedObjects))
        return false;
    }
    return true;
  }

  // 8. The non-equivalence assertion tests for any deep inequality.
  // assert.notDeepEqual(actual, expected, message_opt);
  assert$2.notDeepEqual = notDeepEqual;
  function notDeepEqual(actual, expected, message) {
    if (_deepEqual(actual, expected, false)) {
      fail(actual, expected, message, 'notDeepEqual', notDeepEqual);
    }
  }

  assert$2.notDeepStrictEqual = notDeepStrictEqual;
  function notDeepStrictEqual(actual, expected, message) {
    if (_deepEqual(actual, expected, true)) {
      fail(actual, expected, message, 'notDeepStrictEqual', notDeepStrictEqual);
    }
  }


  // 9. The strict equality assertion tests strict equality, as determined by ===.
  // assert.strictEqual(actual, expected, message_opt);
  assert$2.strictEqual = strictEqual;
  function strictEqual(actual, expected, message) {
    if (actual !== expected) {
      fail(actual, expected, message, '===', strictEqual);
    }
  }

  // 10. The strict non-equality assertion tests for strict inequality, as
  // determined by !==.  assert.notStrictEqual(actual, expected, message_opt);
  assert$2.notStrictEqual = notStrictEqual;
  function notStrictEqual(actual, expected, message) {
    if (actual === expected) {
      fail(actual, expected, message, '!==', notStrictEqual);
    }
  }

  function expectedException(actual, expected) {
    if (!actual || !expected) {
      return false;
    }

    if (Object.prototype.toString.call(expected) == '[object RegExp]') {
      return expected.test(actual);
    }

    try {
      if (actual instanceof expected) {
        return true;
      }
    } catch (e) {
      // Ignore.  The instanceof check doesn't work for arrow functions.
    }

    if (Error.isPrototypeOf(expected)) {
      return false;
    }

    return expected.call({}, actual) === true;
  }

  function _tryBlock(block) {
    var error;
    try {
      block();
    } catch (e) {
      error = e;
    }
    return error;
  }

  function _throws(shouldThrow, block, expected, message) {
    var actual;

    if (typeof block !== 'function') {
      throw new TypeError('"block" argument must be a function');
    }

    if (typeof expected === 'string') {
      message = expected;
      expected = null;
    }

    actual = _tryBlock(block);

    message = (expected && expected.name ? ' (' + expected.name + ').' : '.') +
              (message ? ' ' + message : '.');

    if (shouldThrow && !actual) {
      fail(actual, expected, 'Missing expected exception' + message);
    }

    var userProvidedMessage = typeof message === 'string';
    var isUnwantedException = !shouldThrow && isError(actual);
    var isUnexpectedException = !shouldThrow && actual && !expected;

    if ((isUnwantedException &&
        userProvidedMessage &&
        expectedException(actual, expected)) ||
        isUnexpectedException) {
      fail(actual, expected, 'Got unwanted exception' + message);
    }

    if ((shouldThrow && actual && expected &&
        !expectedException(actual, expected)) || (!shouldThrow && actual)) {
      throw actual;
    }
  }

  // 11. Expected to throw an error:
  // assert.throws(block, Error_opt, message_opt);
  assert$2.throws = throws;
  function throws(block, /*optional*/error, /*optional*/message) {
    _throws(true, block, error, message);
  }

  // EXTENSION! This is annoying to write outside this module.
  assert$2.doesNotThrow = doesNotThrow;
  function doesNotThrow(block, /*optional*/error, /*optional*/message) {
    _throws(false, block, error, message);
  }

  assert$2.ifError = ifError;
  function ifError(err) {
    if (err) throw err;
  }

  var assert$3 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': assert$2,
    AssertionError: AssertionError,
    fail: fail,
    ok: ok,
    assert: ok,
    equal: equal,
    notEqual: notEqual,
    deepEqual: deepEqual,
    deepStrictEqual: deepStrictEqual,
    notDeepEqual: notDeepEqual,
    notDeepStrictEqual: notDeepStrictEqual,
    strictEqual: strictEqual,
    notStrictEqual: notStrictEqual,
    throws: throws,
    doesNotThrow: doesNotThrow,
    ifError: ifError
  });

  /**
   * Helpers.
   */
  var s = 1000;
  var m = s * 60;
  var h = m * 60;
  var d = h * 24;
  var w = d * 7;
  var y = d * 365.25;

  /**
   * Parse or format the given `val`.
   *
   * Options:
   *
   *  - `long` verbose formatting [false]
   *
   * @param {String|Number} val
   * @param {Object} [options]
   * @throws {Error} throw an error if val is not a non-empty string or a number
   * @return {String|Number}
   * @api public
   */

  var ms = function(val, options) {
    options = options || {};
    var type = typeof val;
    if (type === 'string' && val.length > 0) {
      return parse(val);
    } else if (type === 'number' && isFinite(val)) {
      return options.long ? fmtLong(val) : fmtShort(val);
    }
    throw new Error(
      'val is not a non-empty string or a valid number. val=' +
        JSON.stringify(val)
    );
  };

  /**
   * Parse the given `str` and return milliseconds.
   *
   * @param {String} str
   * @return {Number}
   * @api private
   */

  function parse(str) {
    str = String(str);
    if (str.length > 100) {
      return;
    }
    var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
      str
    );
    if (!match) {
      return;
    }
    var n = parseFloat(match[1]);
    var type = (match[2] || 'ms').toLowerCase();
    switch (type) {
      case 'years':
      case 'year':
      case 'yrs':
      case 'yr':
      case 'y':
        return n * y;
      case 'weeks':
      case 'week':
      case 'w':
        return n * w;
      case 'days':
      case 'day':
      case 'd':
        return n * d;
      case 'hours':
      case 'hour':
      case 'hrs':
      case 'hr':
      case 'h':
        return n * h;
      case 'minutes':
      case 'minute':
      case 'mins':
      case 'min':
      case 'm':
        return n * m;
      case 'seconds':
      case 'second':
      case 'secs':
      case 'sec':
      case 's':
        return n * s;
      case 'milliseconds':
      case 'millisecond':
      case 'msecs':
      case 'msec':
      case 'ms':
        return n;
      default:
        return undefined;
    }
  }

  /**
   * Short format for `ms`.
   *
   * @param {Number} ms
   * @return {String}
   * @api private
   */

  function fmtShort(ms) {
    var msAbs = Math.abs(ms);
    if (msAbs >= d) {
      return Math.round(ms / d) + 'd';
    }
    if (msAbs >= h) {
      return Math.round(ms / h) + 'h';
    }
    if (msAbs >= m) {
      return Math.round(ms / m) + 'm';
    }
    if (msAbs >= s) {
      return Math.round(ms / s) + 's';
    }
    return ms + 'ms';
  }

  /**
   * Long format for `ms`.
   *
   * @param {Number} ms
   * @return {String}
   * @api private
   */

  function fmtLong(ms) {
    var msAbs = Math.abs(ms);
    if (msAbs >= d) {
      return plural(ms, msAbs, d, 'day');
    }
    if (msAbs >= h) {
      return plural(ms, msAbs, h, 'hour');
    }
    if (msAbs >= m) {
      return plural(ms, msAbs, m, 'minute');
    }
    if (msAbs >= s) {
      return plural(ms, msAbs, s, 'second');
    }
    return ms + ' ms';
  }

  /**
   * Pluralization helper.
   */

  function plural(ms, msAbs, n, name) {
    var isPlural = msAbs >= n * 1.5;
    return Math.round(ms / n) + ' ' + name + (isPlural ? 's' : '');
  }

  /**
   * This is the common logic for both the Node.js and web browser
   * implementations of `debug()`.
   */

  function setup(env) {
  	createDebug.debug = createDebug;
  	createDebug.default = createDebug;
  	createDebug.coerce = coerce;
  	createDebug.disable = disable;
  	createDebug.enable = enable;
  	createDebug.enabled = enabled;
  	createDebug.humanize = ms;
  	createDebug.destroy = destroy;

  	Object.keys(env).forEach(key => {
  		createDebug[key] = env[key];
  	});

  	/**
  	* The currently active debug mode names, and names to skip.
  	*/

  	createDebug.names = [];
  	createDebug.skips = [];

  	/**
  	* Map of special "%n" handling functions, for the debug "format" argument.
  	*
  	* Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
  	*/
  	createDebug.formatters = {};

  	/**
  	* Selects a color for a debug namespace
  	* @param {String} namespace The namespace string for the for the debug instance to be colored
  	* @return {Number|String} An ANSI color code for the given namespace
  	* @api private
  	*/
  	function selectColor(namespace) {
  		let hash = 0;

  		for (let i = 0; i < namespace.length; i++) {
  			hash = ((hash << 5) - hash) + namespace.charCodeAt(i);
  			hash |= 0; // Convert to 32bit integer
  		}

  		return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
  	}
  	createDebug.selectColor = selectColor;

  	/**
  	* Create a debugger with the given `namespace`.
  	*
  	* @param {String} namespace
  	* @return {Function}
  	* @api public
  	*/
  	function createDebug(namespace) {
  		let prevTime;
  		let enableOverride = null;
  		let namespacesCache;
  		let enabledCache;

  		function debug(...args) {
  			// Disabled?
  			if (!debug.enabled) {
  				return;
  			}

  			const self = debug;

  			// Set `diff` timestamp
  			const curr = Number(new Date());
  			const ms = curr - (prevTime || curr);
  			self.diff = ms;
  			self.prev = prevTime;
  			self.curr = curr;
  			prevTime = curr;

  			args[0] = createDebug.coerce(args[0]);

  			if (typeof args[0] !== 'string') {
  				// Anything else let's inspect with %O
  				args.unshift('%O');
  			}

  			// Apply any `formatters` transformations
  			let index = 0;
  			args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
  				// If we encounter an escaped % then don't increase the array index
  				if (match === '%%') {
  					return '%';
  				}
  				index++;
  				const formatter = createDebug.formatters[format];
  				if (typeof formatter === 'function') {
  					const val = args[index];
  					match = formatter.call(self, val);

  					// Now we need to remove `args[index]` since it's inlined in the `format`
  					args.splice(index, 1);
  					index--;
  				}
  				return match;
  			});

  			// Apply env-specific formatting (colors, etc.)
  			createDebug.formatArgs.call(self, args);

  			const logFn = self.log || createDebug.log;
  			logFn.apply(self, args);
  		}

  		debug.namespace = namespace;
  		debug.useColors = createDebug.useColors();
  		debug.color = createDebug.selectColor(namespace);
  		debug.extend = extend;
  		debug.destroy = createDebug.destroy; // XXX Temporary. Will be removed in the next major release.

  		Object.defineProperty(debug, 'enabled', {
  			enumerable: true,
  			configurable: false,
  			get: () => {
  				if (enableOverride !== null) {
  					return enableOverride;
  				}
  				if (namespacesCache !== createDebug.namespaces) {
  					namespacesCache = createDebug.namespaces;
  					enabledCache = createDebug.enabled(namespace);
  				}

  				return enabledCache;
  			},
  			set: v => {
  				enableOverride = v;
  			}
  		});

  		// Env-specific initialization logic for debug instances
  		if (typeof createDebug.init === 'function') {
  			createDebug.init(debug);
  		}

  		return debug;
  	}

  	function extend(namespace, delimiter) {
  		const newDebug = createDebug(this.namespace + (typeof delimiter === 'undefined' ? ':' : delimiter) + namespace);
  		newDebug.log = this.log;
  		return newDebug;
  	}

  	/**
  	* Enables a debug mode by namespaces. This can include modes
  	* separated by a colon and wildcards.
  	*
  	* @param {String} namespaces
  	* @api public
  	*/
  	function enable(namespaces) {
  		createDebug.save(namespaces);
  		createDebug.namespaces = namespaces;

  		createDebug.names = [];
  		createDebug.skips = [];

  		let i;
  		const split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
  		const len = split.length;

  		for (i = 0; i < len; i++) {
  			if (!split[i]) {
  				// ignore empty strings
  				continue;
  			}

  			namespaces = split[i].replace(/\*/g, '.*?');

  			if (namespaces[0] === '-') {
  				createDebug.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
  			} else {
  				createDebug.names.push(new RegExp('^' + namespaces + '$'));
  			}
  		}
  	}

  	/**
  	* Disable debug output.
  	*
  	* @return {String} namespaces
  	* @api public
  	*/
  	function disable() {
  		const namespaces = [
  			...createDebug.names.map(toNamespace),
  			...createDebug.skips.map(toNamespace).map(namespace => '-' + namespace)
  		].join(',');
  		createDebug.enable('');
  		return namespaces;
  	}

  	/**
  	* Returns true if the given mode name is enabled, false otherwise.
  	*
  	* @param {String} name
  	* @return {Boolean}
  	* @api public
  	*/
  	function enabled(name) {
  		if (name[name.length - 1] === '*') {
  			return true;
  		}

  		let i;
  		let len;

  		for (i = 0, len = createDebug.skips.length; i < len; i++) {
  			if (createDebug.skips[i].test(name)) {
  				return false;
  			}
  		}

  		for (i = 0, len = createDebug.names.length; i < len; i++) {
  			if (createDebug.names[i].test(name)) {
  				return true;
  			}
  		}

  		return false;
  	}

  	/**
  	* Convert regexp to namespace
  	*
  	* @param {RegExp} regxep
  	* @return {String} namespace
  	* @api private
  	*/
  	function toNamespace(regexp) {
  		return regexp.toString()
  			.substring(2, regexp.toString().length - 2)
  			.replace(/\.\*\?$/, '*');
  	}

  	/**
  	* Coerce `val`.
  	*
  	* @param {Mixed} val
  	* @return {Mixed}
  	* @api private
  	*/
  	function coerce(val) {
  		if (val instanceof Error) {
  			return val.stack || val.message;
  		}
  		return val;
  	}

  	/**
  	* XXX DO NOT USE. This is a temporary stub function.
  	* XXX It WILL be removed in the next major release.
  	*/
  	function destroy() {
  		console.warn('Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.');
  	}

  	createDebug.enable(createDebug.load());

  	return createDebug;
  }

  var common = setup;

  var browser$1 = createCommonjsModule(function (module, exports) {
  /**
   * This is the web browser implementation of `debug()`.
   */

  exports.formatArgs = formatArgs;
  exports.save = save;
  exports.load = load;
  exports.useColors = useColors;
  exports.storage = localstorage();
  exports.destroy = (() => {
  	let warned = false;

  	return () => {
  		if (!warned) {
  			warned = true;
  			console.warn('Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.');
  		}
  	};
  })();

  /**
   * Colors.
   */

  exports.colors = [
  	'#0000CC',
  	'#0000FF',
  	'#0033CC',
  	'#0033FF',
  	'#0066CC',
  	'#0066FF',
  	'#0099CC',
  	'#0099FF',
  	'#00CC00',
  	'#00CC33',
  	'#00CC66',
  	'#00CC99',
  	'#00CCCC',
  	'#00CCFF',
  	'#3300CC',
  	'#3300FF',
  	'#3333CC',
  	'#3333FF',
  	'#3366CC',
  	'#3366FF',
  	'#3399CC',
  	'#3399FF',
  	'#33CC00',
  	'#33CC33',
  	'#33CC66',
  	'#33CC99',
  	'#33CCCC',
  	'#33CCFF',
  	'#6600CC',
  	'#6600FF',
  	'#6633CC',
  	'#6633FF',
  	'#66CC00',
  	'#66CC33',
  	'#9900CC',
  	'#9900FF',
  	'#9933CC',
  	'#9933FF',
  	'#99CC00',
  	'#99CC33',
  	'#CC0000',
  	'#CC0033',
  	'#CC0066',
  	'#CC0099',
  	'#CC00CC',
  	'#CC00FF',
  	'#CC3300',
  	'#CC3333',
  	'#CC3366',
  	'#CC3399',
  	'#CC33CC',
  	'#CC33FF',
  	'#CC6600',
  	'#CC6633',
  	'#CC9900',
  	'#CC9933',
  	'#CCCC00',
  	'#CCCC33',
  	'#FF0000',
  	'#FF0033',
  	'#FF0066',
  	'#FF0099',
  	'#FF00CC',
  	'#FF00FF',
  	'#FF3300',
  	'#FF3333',
  	'#FF3366',
  	'#FF3399',
  	'#FF33CC',
  	'#FF33FF',
  	'#FF6600',
  	'#FF6633',
  	'#FF9900',
  	'#FF9933',
  	'#FFCC00',
  	'#FFCC33'
  ];

  /**
   * Currently only WebKit-based Web Inspectors, Firefox >= v31,
   * and the Firebug extension (any Firefox version) are known
   * to support "%c" CSS customizations.
   *
   * TODO: add a `localStorage` variable to explicitly enable/disable colors
   */

  // eslint-disable-next-line complexity
  function useColors() {
  	// NB: In an Electron preload script, document will be defined but not fully
  	// initialized. Since we know we're in Chrome, we'll just detect this case
  	// explicitly
  	if (typeof window !== 'undefined' && window.process && (window.process.type === 'renderer' || window.process.__nwjs)) {
  		return true;
  	}

  	// Internet Explorer and Edge do not support colors.
  	if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
  		return false;
  	}

  	// Is webkit? http://stackoverflow.com/a/16459606/376773
  	// document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
  	return (typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance) ||
  		// Is firebug? http://stackoverflow.com/a/398120/376773
  		(typeof window !== 'undefined' && window.console && (window.console.firebug || (window.console.exception && window.console.table))) ||
  		// Is firefox >= v31?
  		// https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
  		(typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31) ||
  		// Double check webkit in userAgent just in case we are in a worker
  		(typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
  }

  /**
   * Colorize log arguments if enabled.
   *
   * @api public
   */

  function formatArgs(args) {
  	args[0] = (this.useColors ? '%c' : '') +
  		this.namespace +
  		(this.useColors ? ' %c' : ' ') +
  		args[0] +
  		(this.useColors ? '%c ' : ' ') +
  		'+' + module.exports.humanize(this.diff);

  	if (!this.useColors) {
  		return;
  	}

  	const c = 'color: ' + this.color;
  	args.splice(1, 0, c, 'color: inherit');

  	// The final "%c" is somewhat tricky, because there could be other
  	// arguments passed either before or after the %c, so we need to
  	// figure out the correct index to insert the CSS into
  	let index = 0;
  	let lastC = 0;
  	args[0].replace(/%[a-zA-Z%]/g, match => {
  		if (match === '%%') {
  			return;
  		}
  		index++;
  		if (match === '%c') {
  			// We only are interested in the *last* %c
  			// (the user may have provided their own)
  			lastC = index;
  		}
  	});

  	args.splice(lastC, 0, c);
  }

  /**
   * Invokes `console.debug()` when available.
   * No-op when `console.debug` is not a "function".
   * If `console.debug` is not available, falls back
   * to `console.log`.
   *
   * @api public
   */
  exports.log = console.debug || console.log || (() => {});

  /**
   * Save `namespaces`.
   *
   * @param {String} namespaces
   * @api private
   */
  function save(namespaces) {
  	try {
  		if (namespaces) {
  			exports.storage.setItem('debug', namespaces);
  		} else {
  			exports.storage.removeItem('debug');
  		}
  	} catch (error) {
  		// Swallow
  		// XXX (@Qix-) should we be logging these?
  	}
  }

  /**
   * Load `namespaces`.
   *
   * @return {String} returns the previously persisted debug modes
   * @api private
   */
  function load() {
  	let r;
  	try {
  		r = exports.storage.getItem('debug');
  	} catch (error) {
  		// Swallow
  		// XXX (@Qix-) should we be logging these?
  	}

  	// If debug isn't set in LS, and we're in Electron, try to load $DEBUG
  	if (!r && typeof process !== 'undefined' && 'env' in process) {
  		r = process.env.DEBUG;
  	}

  	return r;
  }

  /**
   * Localstorage attempts to return the localstorage.
   *
   * This is necessary because safari throws
   * when a user disables cookies/localstorage
   * and you attempt to access it.
   *
   * @return {LocalStorage}
   * @api private
   */

  function localstorage() {
  	try {
  		// TVMLKit (Apple TV JS Runtime) does not have a window object, just localStorage in the global context
  		// The Browser also has localStorage in the global context.
  		return localStorage;
  	} catch (error) {
  		// Swallow
  		// XXX (@Qix-) should we be logging these?
  	}
  }

  module.exports = common(exports);

  const {formatters} = module.exports;

  /**
   * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
   */

  formatters.j = function (v) {
  	try {
  		return JSON.stringify(v);
  	} catch (error) {
  		return '[UnexpectedJSONParseError]: ' + error.message;
  	}
  };
  });

  // MIT lisence
  // from https://github.com/substack/tty-browserify/blob/1ba769a6429d242f36226538835b4034bf6b7886/index.js

  function isatty() {
    return false;
  }

  function ReadStream() {
    throw new Error('tty.ReadStream is not implemented');
  }

  function WriteStream() {
    throw new Error('tty.ReadStream is not implemented');
  }

  var tty$1 = {
    isatty: isatty,
    ReadStream: ReadStream,
    WriteStream: WriteStream
  };

  var tty$2 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    isatty: isatty,
    ReadStream: ReadStream,
    WriteStream: WriteStream,
    'default': tty$1
  });

  /*
  The MIT License (MIT)

  Copyright (c) 2016 CoderPuppy

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in all
  copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.

  */
  var _endianness;
  function endianness() {
    if (typeof _endianness === 'undefined') {
      var a = new ArrayBuffer(2);
      var b = new Uint8Array(a);
      var c = new Uint16Array(a);
      b[0] = 1;
      b[1] = 2;
      if (c[0] === 258) {
        _endianness = 'BE';
      } else if (c[0] === 513){
        _endianness = 'LE';
      } else {
        throw new Error('unable to figure out endianess');
      }
    }
    return _endianness;
  }

  function hostname() {
    if (typeof global$1.location !== 'undefined') {
      return global$1.location.hostname
    } else return '';
  }

  function loadavg() {
    return [];
  }

  function uptime() {
    return 0;
  }

  function freemem() {
    return Number.MAX_VALUE;
  }

  function totalmem() {
    return Number.MAX_VALUE;
  }

  function cpus() {
    return [];
  }

  function type() {
    return 'Browser';
  }

  function release () {
    if (typeof global$1.navigator !== 'undefined') {
      return global$1.navigator.appVersion;
    }
    return '';
  }

  function networkInterfaces(){}
  function getNetworkInterfaces(){}

  function arch() {
    return 'javascript';
  }

  function platform() {
    return 'browser';
  }

  function tmpDir() {
    return '/tmp';
  }
  var tmpdir = tmpDir;

  var EOL = '\n';
  var os$1 = {
    EOL: EOL,
    tmpdir: tmpdir,
    tmpDir: tmpDir,
    networkInterfaces:networkInterfaces,
    getNetworkInterfaces: getNetworkInterfaces,
    release: release,
    type: type,
    cpus: cpus,
    totalmem: totalmem,
    freemem: freemem,
    uptime: uptime,
    loadavg: loadavg,
    hostname: hostname,
    endianness: endianness,
  };

  var os$2 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    endianness: endianness,
    hostname: hostname,
    loadavg: loadavg,
    uptime: uptime,
    freemem: freemem,
    totalmem: totalmem,
    cpus: cpus,
    type: type,
    release: release,
    networkInterfaces: networkInterfaces,
    getNetworkInterfaces: getNetworkInterfaces,
    arch: arch,
    platform: platform,
    tmpDir: tmpDir,
    tmpdir: tmpdir,
    EOL: EOL,
    'default': os$1
  });

  var hasFlag = (flag, argv) => {
  	argv = argv || process.argv;
  	const prefix = flag.startsWith('-') ? '' : (flag.length === 1 ? '-' : '--');
  	const pos = argv.indexOf(prefix + flag);
  	const terminatorPos = argv.indexOf('--');
  	return pos !== -1 && (terminatorPos === -1 ? true : pos < terminatorPos);
  };

  var os = /*@__PURE__*/getAugmentedNamespace(os$2);

  const env = process.env;

  let forceColor;
  if (hasFlag('no-color') ||
  	hasFlag('no-colors') ||
  	hasFlag('color=false')) {
  	forceColor = false;
  } else if (hasFlag('color') ||
  	hasFlag('colors') ||
  	hasFlag('color=true') ||
  	hasFlag('color=always')) {
  	forceColor = true;
  }
  if ('FORCE_COLOR' in env) {
  	forceColor = env.FORCE_COLOR.length === 0 || parseInt(env.FORCE_COLOR, 10) !== 0;
  }

  function translateLevel(level) {
  	if (level === 0) {
  		return false;
  	}

  	return {
  		level,
  		hasBasic: true,
  		has256: level >= 2,
  		has16m: level >= 3
  	};
  }

  function supportsColor(stream) {
  	if (forceColor === false) {
  		return 0;
  	}

  	if (hasFlag('color=16m') ||
  		hasFlag('color=full') ||
  		hasFlag('color=truecolor')) {
  		return 3;
  	}

  	if (hasFlag('color=256')) {
  		return 2;
  	}

  	if (stream && !stream.isTTY && forceColor !== true) {
  		return 0;
  	}

  	const min = forceColor ? 1 : 0;

  	if (process.platform === 'win32') {
  		// Node.js 7.5.0 is the first version of Node.js to include a patch to
  		// libuv that enables 256 color output on Windows. Anything earlier and it
  		// won't work. However, here we target Node.js 8 at minimum as it is an LTS
  		// release, and Node.js 7 is not. Windows 10 build 10586 is the first Windows
  		// release that supports 256 colors. Windows 10 build 14931 is the first release
  		// that supports 16m/TrueColor.
  		const osRelease = os.release().split('.');
  		if (
  			Number(process.versions.node.split('.')[0]) >= 8 &&
  			Number(osRelease[0]) >= 10 &&
  			Number(osRelease[2]) >= 10586
  		) {
  			return Number(osRelease[2]) >= 14931 ? 3 : 2;
  		}

  		return 1;
  	}

  	if ('CI' in env) {
  		if (['TRAVIS', 'CIRCLECI', 'APPVEYOR', 'GITLAB_CI'].some(sign => sign in env) || env.CI_NAME === 'codeship') {
  			return 1;
  		}

  		return min;
  	}

  	if ('TEAMCITY_VERSION' in env) {
  		return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0;
  	}

  	if (env.COLORTERM === 'truecolor') {
  		return 3;
  	}

  	if ('TERM_PROGRAM' in env) {
  		const version = parseInt((env.TERM_PROGRAM_VERSION || '').split('.')[0], 10);

  		switch (env.TERM_PROGRAM) {
  			case 'iTerm.app':
  				return version >= 3 ? 3 : 2;
  			case 'Apple_Terminal':
  				return 2;
  			// No default
  		}
  	}

  	if (/-256(color)?$/i.test(env.TERM)) {
  		return 2;
  	}

  	if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)) {
  		return 1;
  	}

  	if ('COLORTERM' in env) {
  		return 1;
  	}

  	if (env.TERM === 'dumb') {
  		return min;
  	}

  	return min;
  }

  function getSupportLevel(stream) {
  	const level = supportsColor(stream);
  	return translateLevel(level);
  }

  var supportsColor_1 = {
  	supportsColor: getSupportLevel,
  	stdout: getSupportLevel(process.stdout),
  	stderr: getSupportLevel(process.stderr)
  };

  var tty = /*@__PURE__*/getAugmentedNamespace(tty$2);

  var util = /*@__PURE__*/getAugmentedNamespace(util$2);

  var node = createCommonjsModule(function (module, exports) {
  /**
   * This is the Node.js implementation of `debug()`.
   */

  exports.init = init;
  exports.log = log;
  exports.formatArgs = formatArgs;
  exports.save = save;
  exports.load = load;
  exports.useColors = useColors;
  exports.destroy = util.deprecate(
  	() => {},
  	'Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.'
  );

  /**
   * Colors.
   */

  exports.colors = [6, 2, 3, 4, 5, 1];

  try {
  	// Optional dependency (as in, doesn't need to be installed, NOT like optionalDependencies in package.json)
  	// eslint-disable-next-line import/no-extraneous-dependencies
  	const supportsColor = supportsColor_1;

  	if (supportsColor && (supportsColor.stderr || supportsColor).level >= 2) {
  		exports.colors = [
  			20,
  			21,
  			26,
  			27,
  			32,
  			33,
  			38,
  			39,
  			40,
  			41,
  			42,
  			43,
  			44,
  			45,
  			56,
  			57,
  			62,
  			63,
  			68,
  			69,
  			74,
  			75,
  			76,
  			77,
  			78,
  			79,
  			80,
  			81,
  			92,
  			93,
  			98,
  			99,
  			112,
  			113,
  			128,
  			129,
  			134,
  			135,
  			148,
  			149,
  			160,
  			161,
  			162,
  			163,
  			164,
  			165,
  			166,
  			167,
  			168,
  			169,
  			170,
  			171,
  			172,
  			173,
  			178,
  			179,
  			184,
  			185,
  			196,
  			197,
  			198,
  			199,
  			200,
  			201,
  			202,
  			203,
  			204,
  			205,
  			206,
  			207,
  			208,
  			209,
  			214,
  			215,
  			220,
  			221
  		];
  	}
  } catch (error) {
  	// Swallow - we only care if `supports-color` is available; it doesn't have to be.
  }

  /**
   * Build up the default `inspectOpts` object from the environment variables.
   *
   *   $ DEBUG_COLORS=no DEBUG_DEPTH=10 DEBUG_SHOW_HIDDEN=enabled node script.js
   */

  exports.inspectOpts = Object.keys(process.env).filter(key => {
  	return /^debug_/i.test(key);
  }).reduce((obj, key) => {
  	// Camel-case
  	const prop = key
  		.substring(6)
  		.toLowerCase()
  		.replace(/_([a-z])/g, (_, k) => {
  			return k.toUpperCase();
  		});

  	// Coerce string value into JS value
  	let val = process.env[key];
  	if (/^(yes|on|true|enabled)$/i.test(val)) {
  		val = true;
  	} else if (/^(no|off|false|disabled)$/i.test(val)) {
  		val = false;
  	} else if (val === 'null') {
  		val = null;
  	} else {
  		val = Number(val);
  	}

  	obj[prop] = val;
  	return obj;
  }, {});

  /**
   * Is stdout a TTY? Colored output is enabled when `true`.
   */

  function useColors() {
  	return 'colors' in exports.inspectOpts ?
  		Boolean(exports.inspectOpts.colors) :
  		tty.isatty(process.stderr.fd);
  }

  /**
   * Adds ANSI color escape codes if enabled.
   *
   * @api public
   */

  function formatArgs(args) {
  	const {namespace: name, useColors} = this;

  	if (useColors) {
  		const c = this.color;
  		const colorCode = '\u001B[3' + (c < 8 ? c : '8;5;' + c);
  		const prefix = `  ${colorCode};1m${name} \u001B[0m`;

  		args[0] = prefix + args[0].split('\n').join('\n' + prefix);
  		args.push(colorCode + 'm+' + module.exports.humanize(this.diff) + '\u001B[0m');
  	} else {
  		args[0] = getDate() + name + ' ' + args[0];
  	}
  }

  function getDate() {
  	if (exports.inspectOpts.hideDate) {
  		return '';
  	}
  	return new Date().toISOString() + ' ';
  }

  /**
   * Invokes `util.format()` with the specified arguments and writes to stderr.
   */

  function log(...args) {
  	return process.stderr.write(util.format(...args) + '\n');
  }

  /**
   * Save `namespaces`.
   *
   * @param {String} namespaces
   * @api private
   */
  function save(namespaces) {
  	if (namespaces) {
  		process.env.DEBUG = namespaces;
  	} else {
  		// If you set a process.env field to null or undefined, it gets cast to the
  		// string 'null' or 'undefined'. Just delete instead.
  		delete process.env.DEBUG;
  	}
  }

  /**
   * Load `namespaces`.
   *
   * @return {String} returns the previously persisted debug modes
   * @api private
   */

  function load() {
  	return process.env.DEBUG;
  }

  /**
   * Init logic for `debug` instances.
   *
   * Create a new `inspectOpts` object in case `useColors` is set
   * differently for a particular `debug` instance.
   */

  function init(debug) {
  	debug.inspectOpts = {};

  	const keys = Object.keys(exports.inspectOpts);
  	for (let i = 0; i < keys.length; i++) {
  		debug.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];
  	}
  }

  module.exports = common(exports);

  const {formatters} = module.exports;

  /**
   * Map %o to `util.inspect()`, all on a single line.
   */

  formatters.o = function (v) {
  	this.inspectOpts.colors = this.useColors;
  	return util.inspect(v, this.inspectOpts)
  		.split('\n')
  		.map(str => str.trim())
  		.join(' ');
  };

  /**
   * Map %O to `util.inspect()`, allowing multiple lines if needed.
   */

  formatters.O = function (v) {
  	this.inspectOpts.colors = this.useColors;
  	return util.inspect(v, this.inspectOpts);
  };
  });

  var src = createCommonjsModule(function (module) {
  if (typeof process === 'undefined' || process.type === 'renderer' || process.browser === true || process.__nwjs) {
  	module.exports = browser$1;
  } else {
  	module.exports = node;
  }
  });

  var debug;

  var debug_1 = function () {
    if (!debug) {
      try {
        /* eslint global-require: off */
        debug = src("follow-redirects");
      }
      catch (error) {
        debug = function () { /* */ };
      }
    }
    debug.apply(null, arguments);
  };

  var url = /*@__PURE__*/getAugmentedNamespace(url$2);

  var http = /*@__PURE__*/getAugmentedNamespace(http$2);

  var require$$0 = /*@__PURE__*/getAugmentedNamespace(stream);

  var assert$1 = /*@__PURE__*/getAugmentedNamespace(assert$3);

  var URL = url.URL;


  var Writable = require$$0.Writable;



  // Create handlers that pass events from native requests
  var events = ["abort", "aborted", "connect", "error", "socket", "timeout"];
  var eventHandlers = Object.create(null);
  events.forEach(function (event) {
    eventHandlers[event] = function (arg1, arg2, arg3) {
      this._redirectable.emit(event, arg1, arg2, arg3);
    };
  });

  // Error types with codes
  var RedirectionError = createErrorType(
    "ERR_FR_REDIRECTION_FAILURE",
    ""
  );
  var TooManyRedirectsError = createErrorType(
    "ERR_FR_TOO_MANY_REDIRECTS",
    "Maximum number of redirects exceeded"
  );
  var MaxBodyLengthExceededError = createErrorType(
    "ERR_FR_MAX_BODY_LENGTH_EXCEEDED",
    "Request body larger than maxBodyLength limit"
  );
  var WriteAfterEndError = createErrorType(
    "ERR_STREAM_WRITE_AFTER_END",
    "write after end"
  );

  // An HTTP(S) request that can be redirected
  function RedirectableRequest(options, responseCallback) {
    // Initialize the request
    Writable.call(this);
    this._sanitizeOptions(options);
    this._options = options;
    this._ended = false;
    this._ending = false;
    this._redirectCount = 0;
    this._redirects = [];
    this._requestBodyLength = 0;
    this._requestBodyBuffers = [];

    // Attach a callback if passed
    if (responseCallback) {
      this.on("response", responseCallback);
    }

    // React to responses of native requests
    var self = this;
    this._onNativeResponse = function (response) {
      self._processResponse(response);
    };

    // Perform the first request
    this._performRequest();
  }
  RedirectableRequest.prototype = Object.create(Writable.prototype);

  RedirectableRequest.prototype.abort = function () {
    abortRequest(this._currentRequest);
    this.emit("abort");
  };

  // Writes buffered data to the current native request
  RedirectableRequest.prototype.write = function (data, encoding, callback) {
    // Writing is not allowed if end has been called
    if (this._ending) {
      throw new WriteAfterEndError();
    }

    // Validate input and shift parameters if necessary
    if (!(typeof data === "string" || typeof data === "object" && ("length" in data))) {
      throw new TypeError("data should be a string, Buffer or Uint8Array");
    }
    if (typeof encoding === "function") {
      callback = encoding;
      encoding = null;
    }

    // Ignore empty buffers, since writing them doesn't invoke the callback
    // https://github.com/nodejs/node/issues/22066
    if (data.length === 0) {
      if (callback) {
        callback();
      }
      return;
    }
    // Only write when we don't exceed the maximum body length
    if (this._requestBodyLength + data.length <= this._options.maxBodyLength) {
      this._requestBodyLength += data.length;
      this._requestBodyBuffers.push({ data: data, encoding: encoding });
      this._currentRequest.write(data, encoding, callback);
    }
    // Error when we exceed the maximum body length
    else {
      this.emit("error", new MaxBodyLengthExceededError());
      this.abort();
    }
  };

  // Ends the current native request
  RedirectableRequest.prototype.end = function (data, encoding, callback) {
    // Shift parameters if necessary
    if (typeof data === "function") {
      callback = data;
      data = encoding = null;
    }
    else if (typeof encoding === "function") {
      callback = encoding;
      encoding = null;
    }

    // Write data if needed and end
    if (!data) {
      this._ended = this._ending = true;
      this._currentRequest.end(null, null, callback);
    }
    else {
      var self = this;
      var currentRequest = this._currentRequest;
      this.write(data, encoding, function () {
        self._ended = true;
        currentRequest.end(null, null, callback);
      });
      this._ending = true;
    }
  };

  // Sets a header value on the current native request
  RedirectableRequest.prototype.setHeader = function (name, value) {
    this._options.headers[name] = value;
    this._currentRequest.setHeader(name, value);
  };

  // Clears a header value on the current native request
  RedirectableRequest.prototype.removeHeader = function (name) {
    delete this._options.headers[name];
    this._currentRequest.removeHeader(name);
  };

  // Global timeout for all underlying requests
  RedirectableRequest.prototype.setTimeout = function (msecs, callback) {
    var self = this;
    if (callback) {
      this.on("timeout", callback);
    }

    function destroyOnTimeout(socket) {
      socket.setTimeout(msecs);
      socket.removeListener("timeout", socket.destroy);
      socket.addListener("timeout", socket.destroy);
    }

    // Sets up a timer to trigger a timeout event
    function startTimer(socket) {
      if (self._timeout) {
        clearTimeout(self._timeout);
      }
      self._timeout = setTimeout(function () {
        self.emit("timeout");
        clearTimer();
      }, msecs);
      destroyOnTimeout(socket);
    }

    // Prevent a timeout from triggering
    function clearTimer() {
      clearTimeout(this._timeout);
      if (callback) {
        self.removeListener("timeout", callback);
      }
      if (!this.socket) {
        self._currentRequest.removeListener("socket", startTimer);
      }
    }

    // Start the timer when the socket is opened
    if (this.socket) {
      startTimer(this.socket);
    }
    else {
      this._currentRequest.once("socket", startTimer);
    }

    this.on("socket", destroyOnTimeout);
    this.once("response", clearTimer);
    this.once("error", clearTimer);

    return this;
  };

  // Proxy all other public ClientRequest methods
  [
    "flushHeaders", "getHeader",
    "setNoDelay", "setSocketKeepAlive",
  ].forEach(function (method) {
    RedirectableRequest.prototype[method] = function (a, b) {
      return this._currentRequest[method](a, b);
    };
  });

  // Proxy all public ClientRequest properties
  ["aborted", "connection", "socket"].forEach(function (property) {
    Object.defineProperty(RedirectableRequest.prototype, property, {
      get: function () { return this._currentRequest[property]; },
    });
  });

  RedirectableRequest.prototype._sanitizeOptions = function (options) {
    // Ensure headers are always present
    if (!options.headers) {
      options.headers = {};
    }

    // Since http.request treats host as an alias of hostname,
    // but the url module interprets host as hostname plus port,
    // eliminate the host property to avoid confusion.
    if (options.host) {
      // Use hostname if set, because it has precedence
      if (!options.hostname) {
        options.hostname = options.host;
      }
      delete options.host;
    }

    // Complete the URL object when necessary
    if (!options.pathname && options.path) {
      var searchPos = options.path.indexOf("?");
      if (searchPos < 0) {
        options.pathname = options.path;
      }
      else {
        options.pathname = options.path.substring(0, searchPos);
        options.search = options.path.substring(searchPos);
      }
    }
  };


  // Executes the next native request (initial or redirect)
  RedirectableRequest.prototype._performRequest = function () {
    // Load the native protocol
    var protocol = this._options.protocol;
    var nativeProtocol = this._options.nativeProtocols[protocol];
    if (!nativeProtocol) {
      this.emit("error", new TypeError("Unsupported protocol " + protocol));
      return;
    }

    // If specified, use the agent corresponding to the protocol
    // (HTTP and HTTPS use different types of agents)
    if (this._options.agents) {
      var scheme = protocol.substr(0, protocol.length - 1);
      this._options.agent = this._options.agents[scheme];
    }

    // Create the native request
    var request = this._currentRequest =
          nativeProtocol.request(this._options, this._onNativeResponse);
    this._currentUrl = url.format(this._options);

    // Set up event handlers
    request._redirectable = this;
    for (var e = 0; e < events.length; e++) {
      request.on(events[e], eventHandlers[events[e]]);
    }

    // End a redirected request
    // (The first request must be ended explicitly with RedirectableRequest#end)
    if (this._isRedirect) {
      // Write the request entity and end.
      var i = 0;
      var self = this;
      var buffers = this._requestBodyBuffers;
      (function writeNext(error) {
        // Only write if this request has not been redirected yet
        /* istanbul ignore else */
        if (request === self._currentRequest) {
          // Report any write errors
          /* istanbul ignore if */
          if (error) {
            self.emit("error", error);
          }
          // Write the next buffer if there are still left
          else if (i < buffers.length) {
            var buffer = buffers[i++];
            /* istanbul ignore else */
            if (!request.finished) {
              request.write(buffer.data, buffer.encoding, writeNext);
            }
          }
          // End the request if `end` has been called on us
          else if (self._ended) {
            request.end();
          }
        }
      }());
    }
  };

  // Processes a response from the current native request
  RedirectableRequest.prototype._processResponse = function (response) {
    // Store the redirected response
    var statusCode = response.statusCode;
    if (this._options.trackRedirects) {
      this._redirects.push({
        url: this._currentUrl,
        headers: response.headers,
        statusCode: statusCode,
      });
    }

    // RFC7231§6.4: The 3xx (Redirection) class of status code indicates
    // that further action needs to be taken by the user agent in order to
    // fulfill the request. If a Location header field is provided,
    // the user agent MAY automatically redirect its request to the URI
    // referenced by the Location field value,
    // even if the specific status code is not understood.
    var location = response.headers.location;
    if (location && this._options.followRedirects !== false &&
        statusCode >= 300 && statusCode < 400) {
      // Abort the current request
      abortRequest(this._currentRequest);
      // Discard the remainder of the response to avoid waiting for data
      response.destroy();

      // RFC7231§6.4: A client SHOULD detect and intervene
      // in cyclical redirections (i.e., "infinite" redirection loops).
      if (++this._redirectCount > this._options.maxRedirects) {
        this.emit("error", new TooManyRedirectsError());
        return;
      }

      // RFC7231§6.4: Automatic redirection needs to done with
      // care for methods not known to be safe, […]
      // RFC7231§6.4.2–3: For historical reasons, a user agent MAY change
      // the request method from POST to GET for the subsequent request.
      if ((statusCode === 301 || statusCode === 302) && this._options.method === "POST" ||
          // RFC7231§6.4.4: The 303 (See Other) status code indicates that
          // the server is redirecting the user agent to a different resource […]
          // A user agent can perform a retrieval request targeting that URI
          // (a GET or HEAD request if using HTTP) […]
          (statusCode === 303) && !/^(?:GET|HEAD)$/.test(this._options.method)) {
        this._options.method = "GET";
        // Drop a possible entity and headers related to it
        this._requestBodyBuffers = [];
        removeMatchingHeaders(/^content-/i, this._options.headers);
      }

      // Drop the Host header, as the redirect might lead to a different host
      var previousHostName = removeMatchingHeaders(/^host$/i, this._options.headers) ||
        url.parse(this._currentUrl).hostname;

      // Create the redirected request
      var redirectUrl = url.resolve(this._currentUrl, location);
      debug_1("redirecting to", redirectUrl);
      this._isRedirect = true;
      var redirectUrlParts = url.parse(redirectUrl);
      Object.assign(this._options, redirectUrlParts);

      // Drop the Authorization header if redirecting to another host
      if (redirectUrlParts.hostname !== previousHostName) {
        removeMatchingHeaders(/^authorization$/i, this._options.headers);
      }

      // Evaluate the beforeRedirect callback
      if (typeof this._options.beforeRedirect === "function") {
        var responseDetails = { headers: response.headers };
        try {
          this._options.beforeRedirect.call(null, this._options, responseDetails);
        }
        catch (err) {
          this.emit("error", err);
          return;
        }
        this._sanitizeOptions(this._options);
      }

      // Perform the redirected request
      try {
        this._performRequest();
      }
      catch (cause) {
        var error = new RedirectionError("Redirected request failed: " + cause.message);
        error.cause = cause;
        this.emit("error", error);
      }
    }
    else {
      // The response is not a redirect; return it as-is
      response.responseUrl = this._currentUrl;
      response.redirects = this._redirects;
      this.emit("response", response);

      // Clean up
      this._requestBodyBuffers = [];
    }
  };

  // Wraps the key/value object of protocols with redirect functionality
  function wrap(protocols) {
    // Default settings
    var exports = {
      maxRedirects: 21,
      maxBodyLength: 10 * 1024 * 1024,
    };

    // Wrap each protocol
    var nativeProtocols = {};
    Object.keys(protocols).forEach(function (scheme) {
      var protocol = scheme + ":";
      var nativeProtocol = nativeProtocols[protocol] = protocols[scheme];
      var wrappedProtocol = exports[scheme] = Object.create(nativeProtocol);

      // Executes a request, following redirects
      function request(input, options, callback) {
        // Parse parameters
        if (typeof input === "string") {
          var urlStr = input;
          try {
            input = urlToOptions(new URL(urlStr));
          }
          catch (err) {
            /* istanbul ignore next */
            input = url.parse(urlStr);
          }
        }
        else if (URL && (input instanceof URL)) {
          input = urlToOptions(input);
        }
        else {
          callback = options;
          options = input;
          input = { protocol: protocol };
        }
        if (typeof options === "function") {
          callback = options;
          options = null;
        }

        // Set defaults
        options = Object.assign({
          maxRedirects: exports.maxRedirects,
          maxBodyLength: exports.maxBodyLength,
        }, input, options);
        options.nativeProtocols = nativeProtocols;

        assert$1.equal(options.protocol, protocol, "protocol mismatch");
        debug_1("options", options);
        return new RedirectableRequest(options, callback);
      }

      // Executes a GET request, following redirects
      function get(input, options, callback) {
        var wrappedRequest = wrappedProtocol.request(input, options, callback);
        wrappedRequest.end();
        return wrappedRequest;
      }

      // Expose the properties on the wrapped protocol
      Object.defineProperties(wrappedProtocol, {
        request: { value: request, configurable: true, enumerable: true, writable: true },
        get: { value: get, configurable: true, enumerable: true, writable: true },
      });
    });
    return exports;
  }

  /* istanbul ignore next */
  function noop() { /* empty */ }

  // from https://github.com/nodejs/node/blob/master/lib/internal/url.js
  function urlToOptions(urlObject) {
    var options = {
      protocol: urlObject.protocol,
      hostname: urlObject.hostname.startsWith("[") ?
        /* istanbul ignore next */
        urlObject.hostname.slice(1, -1) :
        urlObject.hostname,
      hash: urlObject.hash,
      search: urlObject.search,
      pathname: urlObject.pathname,
      path: urlObject.pathname + urlObject.search,
      href: urlObject.href,
    };
    if (urlObject.port !== "") {
      options.port = Number(urlObject.port);
    }
    return options;
  }

  function removeMatchingHeaders(regex, headers) {
    var lastValue;
    for (var header in headers) {
      if (regex.test(header)) {
        lastValue = headers[header];
        delete headers[header];
      }
    }
    return lastValue;
  }

  function createErrorType(code, defaultMessage) {
    function CustomError(message) {
      Error.captureStackTrace(this, this.constructor);
      this.message = message || defaultMessage;
    }
    CustomError.prototype = new Error();
    CustomError.prototype.constructor = CustomError;
    CustomError.prototype.name = "Error [" + code + "]";
    CustomError.prototype.code = code;
    return CustomError;
  }

  function abortRequest(request) {
    for (var e = 0; e < events.length; e++) {
      request.removeListener(events[e], eventHandlers[events[e]]);
    }
    request.on("error", noop);
    request.abort();
  }

  // Exports
  var followRedirects = wrap({ http: http, https: http });
  var wrap_1 = wrap;
  followRedirects.wrap = wrap_1;

  var msg = {
    2:      'need dictionary',     /* Z_NEED_DICT       2  */
    1:      'stream end',          /* Z_STREAM_END      1  */
    0:      '',                    /* Z_OK              0  */
    '-1':   'file error',          /* Z_ERRNO         (-1) */
    '-2':   'stream error',        /* Z_STREAM_ERROR  (-2) */
    '-3':   'data error',          /* Z_DATA_ERROR    (-3) */
    '-4':   'insufficient memory', /* Z_MEM_ERROR     (-4) */
    '-5':   'buffer error',        /* Z_BUF_ERROR     (-5) */
    '-6':   'incompatible version' /* Z_VERSION_ERROR (-6) */
  };

  function ZStream() {
    /* next input byte */
    this.input = null; // JS specific, because we have no pointers
    this.next_in = 0;
    /* number of bytes available at input */
    this.avail_in = 0;
    /* total number of input bytes read so far */
    this.total_in = 0;
    /* next output byte should be put there */
    this.output = null; // JS specific, because we have no pointers
    this.next_out = 0;
    /* remaining free space at output */
    this.avail_out = 0;
    /* total number of bytes output so far */
    this.total_out = 0;
    /* last error message, NULL if no error */
    this.msg = ''/*Z_NULL*/;
    /* not visible by applications */
    this.state = null;
    /* best guess about the data type: binary or text */
    this.data_type = 2/*Z_UNKNOWN*/;
    /* adler32 value of the uncompressed data */
    this.adler = 0;
  }

  function arraySet(dest, src, src_offs, len, dest_offs) {
    if (src.subarray && dest.subarray) {
      dest.set(src.subarray(src_offs, src_offs + len), dest_offs);
      return;
    }
    // Fallback to ordinary array
    for (var i = 0; i < len; i++) {
      dest[dest_offs + i] = src[src_offs + i];
    }
  }


  var Buf8 = Uint8Array;
  var Buf16 = Uint16Array;
  var Buf32 = Int32Array;
  // Enable/Disable typed arrays use, for testing
  //

  /* Public constants ==========================================================*/
  /* ===========================================================================*/


  //var Z_FILTERED          = 1;
  //var Z_HUFFMAN_ONLY      = 2;
  //var Z_RLE               = 3;
  var Z_FIXED$2 = 4;
  //var Z_DEFAULT_STRATEGY  = 0;

  /* Possible values of the data_type field (though see inflate()) */
  var Z_BINARY$1 = 0;
  var Z_TEXT$1 = 1;
  //var Z_ASCII             = 1; // = Z_TEXT
  var Z_UNKNOWN$2 = 2;

  /*============================================================================*/


  function zero$1(buf) {
    var len = buf.length;
    while (--len >= 0) {
      buf[len] = 0;
    }
  }

  // From zutil.h

  var STORED_BLOCK = 0;
  var STATIC_TREES = 1;
  var DYN_TREES = 2;
  /* The three kinds of block type */

  var MIN_MATCH$1 = 3;
  var MAX_MATCH$1 = 258;
  /* The minimum and maximum match lengths */

  // From deflate.h
  /* ===========================================================================
   * Internal compression state.
   */

  var LENGTH_CODES$1 = 29;
  /* number of length codes, not counting the special END_BLOCK code */

  var LITERALS$1 = 256;
  /* number of literal bytes 0..255 */

  var L_CODES$1 = LITERALS$1 + 1 + LENGTH_CODES$1;
  /* number of Literal or Length codes, including the END_BLOCK code */

  var D_CODES$1 = 30;
  /* number of distance codes */

  var BL_CODES$1 = 19;
  /* number of codes used to transfer the bit lengths */

  var HEAP_SIZE$1 = 2 * L_CODES$1 + 1;
  /* maximum heap size */

  var MAX_BITS$1 = 15;
  /* All codes must not exceed MAX_BITS bits */

  var Buf_size = 16;
  /* size of bit buffer in bi_buf */


  /* ===========================================================================
   * Constants
   */

  var MAX_BL_BITS = 7;
  /* Bit length codes must not exceed MAX_BL_BITS bits */

  var END_BLOCK = 256;
  /* end of block literal code */

  var REP_3_6 = 16;
  /* repeat previous bit length 3-6 times (2 bits of repeat count) */

  var REPZ_3_10 = 17;
  /* repeat a zero length 3-10 times  (3 bits of repeat count) */

  var REPZ_11_138 = 18;
  /* repeat a zero length 11-138 times  (7 bits of repeat count) */

  /* eslint-disable comma-spacing,array-bracket-spacing */
  var extra_lbits = /* extra bits for each length code */ [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0];

  var extra_dbits = /* extra bits for each distance code */ [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13];

  var extra_blbits = /* extra bits for each bit length code */ [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7];

  var bl_order = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
  /* eslint-enable comma-spacing,array-bracket-spacing */

  /* The lengths of the bit length codes are sent in order of decreasing
   * probability, to avoid transmitting the lengths for unused bit length codes.
   */

  /* ===========================================================================
   * Local data. These are initialized only once.
   */

  // We pre-fill arrays with 0 to avoid uninitialized gaps

  var DIST_CODE_LEN = 512; /* see definition of array dist_code below */

  // !!!! Use flat array insdead of structure, Freq = i*2, Len = i*2+1
  var static_ltree = new Array((L_CODES$1 + 2) * 2);
  zero$1(static_ltree);
  /* The static literal tree. Since the bit lengths are imposed, there is no
   * need for the L_CODES extra codes used during heap construction. However
   * The codes 286 and 287 are needed to build a canonical tree (see _tr_init
   * below).
   */

  var static_dtree = new Array(D_CODES$1 * 2);
  zero$1(static_dtree);
  /* The static distance tree. (Actually a trivial tree since all codes use
   * 5 bits.)
   */

  var _dist_code = new Array(DIST_CODE_LEN);
  zero$1(_dist_code);
  /* Distance codes. The first 256 values correspond to the distances
   * 3 .. 258, the last 256 values correspond to the top 8 bits of
   * the 15 bit distances.
   */

  var _length_code = new Array(MAX_MATCH$1 - MIN_MATCH$1 + 1);
  zero$1(_length_code);
  /* length code for each normalized match length (0 == MIN_MATCH) */

  var base_length = new Array(LENGTH_CODES$1);
  zero$1(base_length);
  /* First normalized length for each code (0 = MIN_MATCH) */

  var base_dist = new Array(D_CODES$1);
  zero$1(base_dist);
  /* First normalized distance for each code (0 = distance of 1) */


  function StaticTreeDesc(static_tree, extra_bits, extra_base, elems, max_length) {

    this.static_tree = static_tree; /* static tree or NULL */
    this.extra_bits = extra_bits; /* extra bits for each code or NULL */
    this.extra_base = extra_base; /* base index for extra_bits */
    this.elems = elems; /* max number of elements in the tree */
    this.max_length = max_length; /* max bit length for the codes */

    // show if `static_tree` has data or dummy - needed for monomorphic objects
    this.has_stree = static_tree && static_tree.length;
  }


  var static_l_desc;
  var static_d_desc;
  var static_bl_desc;


  function TreeDesc(dyn_tree, stat_desc) {
    this.dyn_tree = dyn_tree; /* the dynamic tree */
    this.max_code = 0; /* largest code with non zero frequency */
    this.stat_desc = stat_desc; /* the corresponding static tree */
  }



  function d_code(dist) {
    return dist < 256 ? _dist_code[dist] : _dist_code[256 + (dist >>> 7)];
  }


  /* ===========================================================================
   * Output a short LSB first on the stream.
   * IN assertion: there is enough room in pendingBuf.
   */
  function put_short(s, w) {
    //    put_byte(s, (uch)((w) & 0xff));
    //    put_byte(s, (uch)((ush)(w) >> 8));
    s.pending_buf[s.pending++] = (w) & 0xff;
    s.pending_buf[s.pending++] = (w >>> 8) & 0xff;
  }


  /* ===========================================================================
   * Send a value on a given number of bits.
   * IN assertion: length <= 16 and value fits in length bits.
   */
  function send_bits(s, value, length) {
    if (s.bi_valid > (Buf_size - length)) {
      s.bi_buf |= (value << s.bi_valid) & 0xffff;
      put_short(s, s.bi_buf);
      s.bi_buf = value >> (Buf_size - s.bi_valid);
      s.bi_valid += length - Buf_size;
    } else {
      s.bi_buf |= (value << s.bi_valid) & 0xffff;
      s.bi_valid += length;
    }
  }


  function send_code(s, c, tree) {
    send_bits(s, tree[c * 2] /*.Code*/ , tree[c * 2 + 1] /*.Len*/ );
  }


  /* ===========================================================================
   * Reverse the first len bits of a code, using straightforward code (a faster
   * method would use a table)
   * IN assertion: 1 <= len <= 15
   */
  function bi_reverse(code, len) {
    var res = 0;
    do {
      res |= code & 1;
      code >>>= 1;
      res <<= 1;
    } while (--len > 0);
    return res >>> 1;
  }


  /* ===========================================================================
   * Flush the bit buffer, keeping at most 7 bits in it.
   */
  function bi_flush(s) {
    if (s.bi_valid === 16) {
      put_short(s, s.bi_buf);
      s.bi_buf = 0;
      s.bi_valid = 0;

    } else if (s.bi_valid >= 8) {
      s.pending_buf[s.pending++] = s.bi_buf & 0xff;
      s.bi_buf >>= 8;
      s.bi_valid -= 8;
    }
  }


  /* ===========================================================================
   * Compute the optimal bit lengths for a tree and update the total bit length
   * for the current block.
   * IN assertion: the fields freq and dad are set, heap[heap_max] and
   *    above are the tree nodes sorted by increasing frequency.
   * OUT assertions: the field len is set to the optimal bit length, the
   *     array bl_count contains the frequencies for each bit length.
   *     The length opt_len is updated; static_len is also updated if stree is
   *     not null.
   */
  function gen_bitlen(s, desc) {
  //    deflate_state *s;
  //    tree_desc *desc;    /* the tree descriptor */
    var tree = desc.dyn_tree;
    var max_code = desc.max_code;
    var stree = desc.stat_desc.static_tree;
    var has_stree = desc.stat_desc.has_stree;
    var extra = desc.stat_desc.extra_bits;
    var base = desc.stat_desc.extra_base;
    var max_length = desc.stat_desc.max_length;
    var h; /* heap index */
    var n, m; /* iterate over the tree elements */
    var bits; /* bit length */
    var xbits; /* extra bits */
    var f; /* frequency */
    var overflow = 0; /* number of elements with bit length too large */

    for (bits = 0; bits <= MAX_BITS$1; bits++) {
      s.bl_count[bits] = 0;
    }

    /* In a first pass, compute the optimal bit lengths (which may
     * overflow in the case of the bit length tree).
     */
    tree[s.heap[s.heap_max] * 2 + 1] /*.Len*/ = 0; /* root of the heap */

    for (h = s.heap_max + 1; h < HEAP_SIZE$1; h++) {
      n = s.heap[h];
      bits = tree[tree[n * 2 + 1] /*.Dad*/ * 2 + 1] /*.Len*/ + 1;
      if (bits > max_length) {
        bits = max_length;
        overflow++;
      }
      tree[n * 2 + 1] /*.Len*/ = bits;
      /* We overwrite tree[n].Dad which is no longer needed */

      if (n > max_code) {
        continue;
      } /* not a leaf node */

      s.bl_count[bits]++;
      xbits = 0;
      if (n >= base) {
        xbits = extra[n - base];
      }
      f = tree[n * 2] /*.Freq*/ ;
      s.opt_len += f * (bits + xbits);
      if (has_stree) {
        s.static_len += f * (stree[n * 2 + 1] /*.Len*/ + xbits);
      }
    }
    if (overflow === 0) {
      return;
    }

    // Trace((stderr,"\nbit length overflow\n"));
    /* This happens for example on obj2 and pic of the Calgary corpus */

    /* Find the first bit length which could increase: */
    do {
      bits = max_length - 1;
      while (s.bl_count[bits] === 0) {
        bits--;
      }
      s.bl_count[bits]--; /* move one leaf down the tree */
      s.bl_count[bits + 1] += 2; /* move one overflow item as its brother */
      s.bl_count[max_length]--;
      /* The brother of the overflow item also moves one step up,
       * but this does not affect bl_count[max_length]
       */
      overflow -= 2;
    } while (overflow > 0);

    /* Now recompute all bit lengths, scanning in increasing frequency.
     * h is still equal to HEAP_SIZE. (It is simpler to reconstruct all
     * lengths instead of fixing only the wrong ones. This idea is taken
     * from 'ar' written by Haruhiko Okumura.)
     */
    for (bits = max_length; bits !== 0; bits--) {
      n = s.bl_count[bits];
      while (n !== 0) {
        m = s.heap[--h];
        if (m > max_code) {
          continue;
        }
        if (tree[m * 2 + 1] /*.Len*/ !== bits) {
          // Trace((stderr,"code %d bits %d->%d\n", m, tree[m].Len, bits));
          s.opt_len += (bits - tree[m * 2 + 1] /*.Len*/ ) * tree[m * 2] /*.Freq*/ ;
          tree[m * 2 + 1] /*.Len*/ = bits;
        }
        n--;
      }
    }
  }


  /* ===========================================================================
   * Generate the codes for a given tree and bit counts (which need not be
   * optimal).
   * IN assertion: the array bl_count contains the bit length statistics for
   * the given tree and the field len is set for all tree elements.
   * OUT assertion: the field code is set for all tree elements of non
   *     zero code length.
   */
  function gen_codes(tree, max_code, bl_count) {
  //    ct_data *tree;             /* the tree to decorate */
  //    int max_code;              /* largest code with non zero frequency */
  //    ushf *bl_count;            /* number of codes at each bit length */

    var next_code = new Array(MAX_BITS$1 + 1); /* next code value for each bit length */
    var code = 0; /* running code value */
    var bits; /* bit index */
    var n; /* code index */

    /* The distribution counts are first used to generate the code values
     * without bit reversal.
     */
    for (bits = 1; bits <= MAX_BITS$1; bits++) {
      next_code[bits] = code = (code + bl_count[bits - 1]) << 1;
    }
    /* Check that the bit counts in bl_count are consistent. The last code
     * must be all ones.
     */
    //Assert (code + bl_count[MAX_BITS]-1 == (1<<MAX_BITS)-1,
    //        "inconsistent bit counts");
    //Tracev((stderr,"\ngen_codes: max_code %d ", max_code));

    for (n = 0; n <= max_code; n++) {
      var len = tree[n * 2 + 1] /*.Len*/ ;
      if (len === 0) {
        continue;
      }
      /* Now reverse the bits */
      tree[n * 2] /*.Code*/ = bi_reverse(next_code[len]++, len);

      //Tracecv(tree != static_ltree, (stderr,"\nn %3d %c l %2d c %4x (%x) ",
      //     n, (isgraph(n) ? n : ' '), len, tree[n].Code, next_code[len]-1));
    }
  }


  /* ===========================================================================
   * Initialize the various 'constant' tables.
   */
  function tr_static_init() {
    var n; /* iterates over tree elements */
    var bits; /* bit counter */
    var length; /* length value */
    var code; /* code value */
    var dist; /* distance index */
    var bl_count = new Array(MAX_BITS$1 + 1);
    /* number of codes at each bit length for an optimal tree */

    // do check in _tr_init()
    //if (static_init_done) return;

    /* For some embedded targets, global variables are not initialized: */
    /*#ifdef NO_INIT_GLOBAL_POINTERS
      static_l_desc.static_tree = static_ltree;
      static_l_desc.extra_bits = extra_lbits;
      static_d_desc.static_tree = static_dtree;
      static_d_desc.extra_bits = extra_dbits;
      static_bl_desc.extra_bits = extra_blbits;
    #endif*/

    /* Initialize the mapping length (0..255) -> length code (0..28) */
    length = 0;
    for (code = 0; code < LENGTH_CODES$1 - 1; code++) {
      base_length[code] = length;
      for (n = 0; n < (1 << extra_lbits[code]); n++) {
        _length_code[length++] = code;
      }
    }
    //Assert (length == 256, "tr_static_init: length != 256");
    /* Note that the length 255 (match length 258) can be represented
     * in two different ways: code 284 + 5 bits or code 285, so we
     * overwrite length_code[255] to use the best encoding:
     */
    _length_code[length - 1] = code;

    /* Initialize the mapping dist (0..32K) -> dist code (0..29) */
    dist = 0;
    for (code = 0; code < 16; code++) {
      base_dist[code] = dist;
      for (n = 0; n < (1 << extra_dbits[code]); n++) {
        _dist_code[dist++] = code;
      }
    }
    //Assert (dist == 256, "tr_static_init: dist != 256");
    dist >>= 7; /* from now on, all distances are divided by 128 */
    for (; code < D_CODES$1; code++) {
      base_dist[code] = dist << 7;
      for (n = 0; n < (1 << (extra_dbits[code] - 7)); n++) {
        _dist_code[256 + dist++] = code;
      }
    }
    //Assert (dist == 256, "tr_static_init: 256+dist != 512");

    /* Construct the codes of the static literal tree */
    for (bits = 0; bits <= MAX_BITS$1; bits++) {
      bl_count[bits] = 0;
    }

    n = 0;
    while (n <= 143) {
      static_ltree[n * 2 + 1] /*.Len*/ = 8;
      n++;
      bl_count[8]++;
    }
    while (n <= 255) {
      static_ltree[n * 2 + 1] /*.Len*/ = 9;
      n++;
      bl_count[9]++;
    }
    while (n <= 279) {
      static_ltree[n * 2 + 1] /*.Len*/ = 7;
      n++;
      bl_count[7]++;
    }
    while (n <= 287) {
      static_ltree[n * 2 + 1] /*.Len*/ = 8;
      n++;
      bl_count[8]++;
    }
    /* Codes 286 and 287 do not exist, but we must include them in the
     * tree construction to get a canonical Huffman tree (longest code
     * all ones)
     */
    gen_codes(static_ltree, L_CODES$1 + 1, bl_count);

    /* The static distance tree is trivial: */
    for (n = 0; n < D_CODES$1; n++) {
      static_dtree[n * 2 + 1] /*.Len*/ = 5;
      static_dtree[n * 2] /*.Code*/ = bi_reverse(n, 5);
    }

    // Now data ready and we can init static trees
    static_l_desc = new StaticTreeDesc(static_ltree, extra_lbits, LITERALS$1 + 1, L_CODES$1, MAX_BITS$1);
    static_d_desc = new StaticTreeDesc(static_dtree, extra_dbits, 0, D_CODES$1, MAX_BITS$1);
    static_bl_desc = new StaticTreeDesc(new Array(0), extra_blbits, 0, BL_CODES$1, MAX_BL_BITS);

    //static_init_done = true;
  }


  /* ===========================================================================
   * Initialize a new block.
   */
  function init_block(s) {
    var n; /* iterates over tree elements */

    /* Initialize the trees. */
    for (n = 0; n < L_CODES$1; n++) {
      s.dyn_ltree[n * 2] /*.Freq*/ = 0;
    }
    for (n = 0; n < D_CODES$1; n++) {
      s.dyn_dtree[n * 2] /*.Freq*/ = 0;
    }
    for (n = 0; n < BL_CODES$1; n++) {
      s.bl_tree[n * 2] /*.Freq*/ = 0;
    }

    s.dyn_ltree[END_BLOCK * 2] /*.Freq*/ = 1;
    s.opt_len = s.static_len = 0;
    s.last_lit = s.matches = 0;
  }


  /* ===========================================================================
   * Flush the bit buffer and align the output on a byte boundary
   */
  function bi_windup(s) {
    if (s.bi_valid > 8) {
      put_short(s, s.bi_buf);
    } else if (s.bi_valid > 0) {
      //put_byte(s, (Byte)s->bi_buf);
      s.pending_buf[s.pending++] = s.bi_buf;
    }
    s.bi_buf = 0;
    s.bi_valid = 0;
  }

  /* ===========================================================================
   * Copy a stored block, storing first the length and its
   * one's complement if requested.
   */
  function copy_block(s, buf, len, header) {
  //DeflateState *s;
  //charf    *buf;    /* the input data */
  //unsigned len;     /* its length */
  //int      header;  /* true if block header must be written */

    bi_windup(s); /* align on byte boundary */

    if (header) {
      put_short(s, len);
      put_short(s, ~len);
    }
    //  while (len--) {
    //    put_byte(s, *buf++);
    //  }
    arraySet(s.pending_buf, s.window, buf, len, s.pending);
    s.pending += len;
  }

  /* ===========================================================================
   * Compares to subtrees, using the tree depth as tie breaker when
   * the subtrees have equal frequency. This minimizes the worst case length.
   */
  function smaller(tree, n, m, depth) {
    var _n2 = n * 2;
    var _m2 = m * 2;
    return (tree[_n2] /*.Freq*/ < tree[_m2] /*.Freq*/ ||
      (tree[_n2] /*.Freq*/ === tree[_m2] /*.Freq*/ && depth[n] <= depth[m]));
  }

  /* ===========================================================================
   * Restore the heap property by moving down the tree starting at node k,
   * exchanging a node with the smallest of its two sons if necessary, stopping
   * when the heap property is re-established (each father smaller than its
   * two sons).
   */
  function pqdownheap(s, tree, k)
  //    deflate_state *s;
  //    ct_data *tree;  /* the tree to restore */
  //    int k;               /* node to move down */
  {
    var v = s.heap[k];
    var j = k << 1; /* left son of k */
    while (j <= s.heap_len) {
      /* Set j to the smallest of the two sons: */
      if (j < s.heap_len &&
        smaller(tree, s.heap[j + 1], s.heap[j], s.depth)) {
        j++;
      }
      /* Exit if v is smaller than both sons */
      if (smaller(tree, v, s.heap[j], s.depth)) {
        break;
      }

      /* Exchange v with the smallest son */
      s.heap[k] = s.heap[j];
      k = j;

      /* And continue down the tree, setting j to the left son of k */
      j <<= 1;
    }
    s.heap[k] = v;
  }


  // inlined manually
  // var SMALLEST = 1;

  /* ===========================================================================
   * Send the block data compressed using the given Huffman trees
   */
  function compress_block(s, ltree, dtree)
  //    deflate_state *s;
  //    const ct_data *ltree; /* literal tree */
  //    const ct_data *dtree; /* distance tree */
  {
    var dist; /* distance of matched string */
    var lc; /* match length or unmatched char (if dist == 0) */
    var lx = 0; /* running index in l_buf */
    var code; /* the code to send */
    var extra; /* number of extra bits to send */

    if (s.last_lit !== 0) {
      do {
        dist = (s.pending_buf[s.d_buf + lx * 2] << 8) | (s.pending_buf[s.d_buf + lx * 2 + 1]);
        lc = s.pending_buf[s.l_buf + lx];
        lx++;

        if (dist === 0) {
          send_code(s, lc, ltree); /* send a literal byte */
          //Tracecv(isgraph(lc), (stderr," '%c' ", lc));
        } else {
          /* Here, lc is the match length - MIN_MATCH */
          code = _length_code[lc];
          send_code(s, code + LITERALS$1 + 1, ltree); /* send the length code */
          extra = extra_lbits[code];
          if (extra !== 0) {
            lc -= base_length[code];
            send_bits(s, lc, extra); /* send the extra length bits */
          }
          dist--; /* dist is now the match distance - 1 */
          code = d_code(dist);
          //Assert (code < D_CODES, "bad d_code");

          send_code(s, code, dtree); /* send the distance code */
          extra = extra_dbits[code];
          if (extra !== 0) {
            dist -= base_dist[code];
            send_bits(s, dist, extra); /* send the extra distance bits */
          }
        } /* literal or match pair ? */

        /* Check that the overlay between pending_buf and d_buf+l_buf is ok: */
        //Assert((uInt)(s->pending) < s->lit_bufsize + 2*lx,
        //       "pendingBuf overflow");

      } while (lx < s.last_lit);
    }

    send_code(s, END_BLOCK, ltree);
  }


  /* ===========================================================================
   * Construct one Huffman tree and assigns the code bit strings and lengths.
   * Update the total bit length for the current block.
   * IN assertion: the field freq is set for all tree elements.
   * OUT assertions: the fields len and code are set to the optimal bit length
   *     and corresponding code. The length opt_len is updated; static_len is
   *     also updated if stree is not null. The field max_code is set.
   */
  function build_tree(s, desc)
  //    deflate_state *s;
  //    tree_desc *desc; /* the tree descriptor */
  {
    var tree = desc.dyn_tree;
    var stree = desc.stat_desc.static_tree;
    var has_stree = desc.stat_desc.has_stree;
    var elems = desc.stat_desc.elems;
    var n, m; /* iterate over heap elements */
    var max_code = -1; /* largest code with non zero frequency */
    var node; /* new node being created */

    /* Construct the initial heap, with least frequent element in
     * heap[SMALLEST]. The sons of heap[n] are heap[2*n] and heap[2*n+1].
     * heap[0] is not used.
     */
    s.heap_len = 0;
    s.heap_max = HEAP_SIZE$1;

    for (n = 0; n < elems; n++) {
      if (tree[n * 2] /*.Freq*/ !== 0) {
        s.heap[++s.heap_len] = max_code = n;
        s.depth[n] = 0;

      } else {
        tree[n * 2 + 1] /*.Len*/ = 0;
      }
    }

    /* The pkzip format requires that at least one distance code exists,
     * and that at least one bit should be sent even if there is only one
     * possible code. So to avoid special checks later on we force at least
     * two codes of non zero frequency.
     */
    while (s.heap_len < 2) {
      node = s.heap[++s.heap_len] = (max_code < 2 ? ++max_code : 0);
      tree[node * 2] /*.Freq*/ = 1;
      s.depth[node] = 0;
      s.opt_len--;

      if (has_stree) {
        s.static_len -= stree[node * 2 + 1] /*.Len*/ ;
      }
      /* node is 0 or 1 so it does not have extra bits */
    }
    desc.max_code = max_code;

    /* The elements heap[heap_len/2+1 .. heap_len] are leaves of the tree,
     * establish sub-heaps of increasing lengths:
     */
    for (n = (s.heap_len >> 1 /*int /2*/ ); n >= 1; n--) {
      pqdownheap(s, tree, n);
    }

    /* Construct the Huffman tree by repeatedly combining the least two
     * frequent nodes.
     */
    node = elems; /* next internal node of the tree */
    do {
      //pqremove(s, tree, n);  /* n = node of least frequency */
      /*** pqremove ***/
      n = s.heap[1 /*SMALLEST*/ ];
      s.heap[1 /*SMALLEST*/ ] = s.heap[s.heap_len--];
      pqdownheap(s, tree, 1 /*SMALLEST*/ );
      /***/

      m = s.heap[1 /*SMALLEST*/ ]; /* m = node of next least frequency */

      s.heap[--s.heap_max] = n; /* keep the nodes sorted by frequency */
      s.heap[--s.heap_max] = m;

      /* Create a new node father of n and m */
      tree[node * 2] /*.Freq*/ = tree[n * 2] /*.Freq*/ + tree[m * 2] /*.Freq*/ ;
      s.depth[node] = (s.depth[n] >= s.depth[m] ? s.depth[n] : s.depth[m]) + 1;
      tree[n * 2 + 1] /*.Dad*/ = tree[m * 2 + 1] /*.Dad*/ = node;

      /* and insert the new node in the heap */
      s.heap[1 /*SMALLEST*/ ] = node++;
      pqdownheap(s, tree, 1 /*SMALLEST*/ );

    } while (s.heap_len >= 2);

    s.heap[--s.heap_max] = s.heap[1 /*SMALLEST*/ ];

    /* At this point, the fields freq and dad are set. We can now
     * generate the bit lengths.
     */
    gen_bitlen(s, desc);

    /* The field len is now set, we can generate the bit codes */
    gen_codes(tree, max_code, s.bl_count);
  }


  /* ===========================================================================
   * Scan a literal or distance tree to determine the frequencies of the codes
   * in the bit length tree.
   */
  function scan_tree(s, tree, max_code)
  //    deflate_state *s;
  //    ct_data *tree;   /* the tree to be scanned */
  //    int max_code;    /* and its largest code of non zero frequency */
  {
    var n; /* iterates over all tree elements */
    var prevlen = -1; /* last emitted length */
    var curlen; /* length of current code */

    var nextlen = tree[0 * 2 + 1] /*.Len*/ ; /* length of next code */

    var count = 0; /* repeat count of the current code */
    var max_count = 7; /* max repeat count */
    var min_count = 4; /* min repeat count */

    if (nextlen === 0) {
      max_count = 138;
      min_count = 3;
    }
    tree[(max_code + 1) * 2 + 1] /*.Len*/ = 0xffff; /* guard */

    for (n = 0; n <= max_code; n++) {
      curlen = nextlen;
      nextlen = tree[(n + 1) * 2 + 1] /*.Len*/ ;

      if (++count < max_count && curlen === nextlen) {
        continue;

      } else if (count < min_count) {
        s.bl_tree[curlen * 2] /*.Freq*/ += count;

      } else if (curlen !== 0) {

        if (curlen !== prevlen) {
          s.bl_tree[curlen * 2] /*.Freq*/ ++;
        }
        s.bl_tree[REP_3_6 * 2] /*.Freq*/ ++;

      } else if (count <= 10) {
        s.bl_tree[REPZ_3_10 * 2] /*.Freq*/ ++;

      } else {
        s.bl_tree[REPZ_11_138 * 2] /*.Freq*/ ++;
      }

      count = 0;
      prevlen = curlen;

      if (nextlen === 0) {
        max_count = 138;
        min_count = 3;

      } else if (curlen === nextlen) {
        max_count = 6;
        min_count = 3;

      } else {
        max_count = 7;
        min_count = 4;
      }
    }
  }


  /* ===========================================================================
   * Send a literal or distance tree in compressed form, using the codes in
   * bl_tree.
   */
  function send_tree(s, tree, max_code)
  //    deflate_state *s;
  //    ct_data *tree; /* the tree to be scanned */
  //    int max_code;       /* and its largest code of non zero frequency */
  {
    var n; /* iterates over all tree elements */
    var prevlen = -1; /* last emitted length */
    var curlen; /* length of current code */

    var nextlen = tree[0 * 2 + 1] /*.Len*/ ; /* length of next code */

    var count = 0; /* repeat count of the current code */
    var max_count = 7; /* max repeat count */
    var min_count = 4; /* min repeat count */

    /* tree[max_code+1].Len = -1; */
    /* guard already set */
    if (nextlen === 0) {
      max_count = 138;
      min_count = 3;
    }

    for (n = 0; n <= max_code; n++) {
      curlen = nextlen;
      nextlen = tree[(n + 1) * 2 + 1] /*.Len*/ ;

      if (++count < max_count && curlen === nextlen) {
        continue;

      } else if (count < min_count) {
        do {
          send_code(s, curlen, s.bl_tree);
        } while (--count !== 0);

      } else if (curlen !== 0) {
        if (curlen !== prevlen) {
          send_code(s, curlen, s.bl_tree);
          count--;
        }
        //Assert(count >= 3 && count <= 6, " 3_6?");
        send_code(s, REP_3_6, s.bl_tree);
        send_bits(s, count - 3, 2);

      } else if (count <= 10) {
        send_code(s, REPZ_3_10, s.bl_tree);
        send_bits(s, count - 3, 3);

      } else {
        send_code(s, REPZ_11_138, s.bl_tree);
        send_bits(s, count - 11, 7);
      }

      count = 0;
      prevlen = curlen;
      if (nextlen === 0) {
        max_count = 138;
        min_count = 3;

      } else if (curlen === nextlen) {
        max_count = 6;
        min_count = 3;

      } else {
        max_count = 7;
        min_count = 4;
      }
    }
  }


  /* ===========================================================================
   * Construct the Huffman tree for the bit lengths and return the index in
   * bl_order of the last bit length code to send.
   */
  function build_bl_tree(s) {
    var max_blindex; /* index of last bit length code of non zero freq */

    /* Determine the bit length frequencies for literal and distance trees */
    scan_tree(s, s.dyn_ltree, s.l_desc.max_code);
    scan_tree(s, s.dyn_dtree, s.d_desc.max_code);

    /* Build the bit length tree: */
    build_tree(s, s.bl_desc);
    /* opt_len now includes the length of the tree representations, except
     * the lengths of the bit lengths codes and the 5+5+4 bits for the counts.
     */

    /* Determine the number of bit length codes to send. The pkzip format
     * requires that at least 4 bit length codes be sent. (appnote.txt says
     * 3 but the actual value used is 4.)
     */
    for (max_blindex = BL_CODES$1 - 1; max_blindex >= 3; max_blindex--) {
      if (s.bl_tree[bl_order[max_blindex] * 2 + 1] /*.Len*/ !== 0) {
        break;
      }
    }
    /* Update opt_len to include the bit length tree and counts */
    s.opt_len += 3 * (max_blindex + 1) + 5 + 5 + 4;
    //Tracev((stderr, "\ndyn trees: dyn %ld, stat %ld",
    //        s->opt_len, s->static_len));

    return max_blindex;
  }


  /* ===========================================================================
   * Send the header for a block using dynamic Huffman trees: the counts, the
   * lengths of the bit length codes, the literal tree and the distance tree.
   * IN assertion: lcodes >= 257, dcodes >= 1, blcodes >= 4.
   */
  function send_all_trees(s, lcodes, dcodes, blcodes)
  //    deflate_state *s;
  //    int lcodes, dcodes, blcodes; /* number of codes for each tree */
  {
    var rank; /* index in bl_order */

    //Assert (lcodes >= 257 && dcodes >= 1 && blcodes >= 4, "not enough codes");
    //Assert (lcodes <= L_CODES && dcodes <= D_CODES && blcodes <= BL_CODES,
    //        "too many codes");
    //Tracev((stderr, "\nbl counts: "));
    send_bits(s, lcodes - 257, 5); /* not +255 as stated in appnote.txt */
    send_bits(s, dcodes - 1, 5);
    send_bits(s, blcodes - 4, 4); /* not -3 as stated in appnote.txt */
    for (rank = 0; rank < blcodes; rank++) {
      //Tracev((stderr, "\nbl code %2d ", bl_order[rank]));
      send_bits(s, s.bl_tree[bl_order[rank] * 2 + 1] /*.Len*/ , 3);
    }
    //Tracev((stderr, "\nbl tree: sent %ld", s->bits_sent));

    send_tree(s, s.dyn_ltree, lcodes - 1); /* literal tree */
    //Tracev((stderr, "\nlit tree: sent %ld", s->bits_sent));

    send_tree(s, s.dyn_dtree, dcodes - 1); /* distance tree */
    //Tracev((stderr, "\ndist tree: sent %ld", s->bits_sent));
  }


  /* ===========================================================================
   * Check if the data type is TEXT or BINARY, using the following algorithm:
   * - TEXT if the two conditions below are satisfied:
   *    a) There are no non-portable control characters belonging to the
   *       "black list" (0..6, 14..25, 28..31).
   *    b) There is at least one printable character belonging to the
   *       "white list" (9 {TAB}, 10 {LF}, 13 {CR}, 32..255).
   * - BINARY otherwise.
   * - The following partially-portable control characters form a
   *   "gray list" that is ignored in this detection algorithm:
   *   (7 {BEL}, 8 {BS}, 11 {VT}, 12 {FF}, 26 {SUB}, 27 {ESC}).
   * IN assertion: the fields Freq of dyn_ltree are set.
   */
  function detect_data_type(s) {
    /* black_mask is the bit mask of black-listed bytes
     * set bits 0..6, 14..25, and 28..31
     * 0xf3ffc07f = binary 11110011111111111100000001111111
     */
    var black_mask = 0xf3ffc07f;
    var n;

    /* Check for non-textual ("black-listed") bytes. */
    for (n = 0; n <= 31; n++, black_mask >>>= 1) {
      if ((black_mask & 1) && (s.dyn_ltree[n * 2] /*.Freq*/ !== 0)) {
        return Z_BINARY$1;
      }
    }

    /* Check for textual ("white-listed") bytes. */
    if (s.dyn_ltree[9 * 2] /*.Freq*/ !== 0 || s.dyn_ltree[10 * 2] /*.Freq*/ !== 0 ||
      s.dyn_ltree[13 * 2] /*.Freq*/ !== 0) {
      return Z_TEXT$1;
    }
    for (n = 32; n < LITERALS$1; n++) {
      if (s.dyn_ltree[n * 2] /*.Freq*/ !== 0) {
        return Z_TEXT$1;
      }
    }

    /* There are no "black-listed" or "white-listed" bytes:
     * this stream either is empty or has tolerated ("gray-listed") bytes only.
     */
    return Z_BINARY$1;
  }


  var static_init_done = false;

  /* ===========================================================================
   * Initialize the tree data structures for a new zlib stream.
   */
  function _tr_init(s) {

    if (!static_init_done) {
      tr_static_init();
      static_init_done = true;
    }

    s.l_desc = new TreeDesc(s.dyn_ltree, static_l_desc);
    s.d_desc = new TreeDesc(s.dyn_dtree, static_d_desc);
    s.bl_desc = new TreeDesc(s.bl_tree, static_bl_desc);

    s.bi_buf = 0;
    s.bi_valid = 0;

    /* Initialize the first block of the first file: */
    init_block(s);
  }


  /* ===========================================================================
   * Send a stored block
   */
  function _tr_stored_block(s, buf, stored_len, last)
  //DeflateState *s;
  //charf *buf;       /* input block */
  //ulg stored_len;   /* length of input block */
  //int last;         /* one if this is the last block for a file */
  {
    send_bits(s, (STORED_BLOCK << 1) + (last ? 1 : 0), 3); /* send block type */
    copy_block(s, buf, stored_len, true); /* with header */
  }


  /* ===========================================================================
   * Send one empty static block to give enough lookahead for inflate.
   * This takes 10 bits, of which 7 may remain in the bit buffer.
   */
  function _tr_align(s) {
    send_bits(s, STATIC_TREES << 1, 3);
    send_code(s, END_BLOCK, static_ltree);
    bi_flush(s);
  }


  /* ===========================================================================
   * Determine the best encoding for the current block: dynamic trees, static
   * trees or store, and output the encoded block to the zip file.
   */
  function _tr_flush_block(s, buf, stored_len, last)
  //DeflateState *s;
  //charf *buf;       /* input block, or NULL if too old */
  //ulg stored_len;   /* length of input block */
  //int last;         /* one if this is the last block for a file */
  {
    var opt_lenb, static_lenb; /* opt_len and static_len in bytes */
    var max_blindex = 0; /* index of last bit length code of non zero freq */

    /* Build the Huffman trees unless a stored block is forced */
    if (s.level > 0) {

      /* Check if the file is binary or text */
      if (s.strm.data_type === Z_UNKNOWN$2) {
        s.strm.data_type = detect_data_type(s);
      }

      /* Construct the literal and distance trees */
      build_tree(s, s.l_desc);
      // Tracev((stderr, "\nlit data: dyn %ld, stat %ld", s->opt_len,
      //        s->static_len));

      build_tree(s, s.d_desc);
      // Tracev((stderr, "\ndist data: dyn %ld, stat %ld", s->opt_len,
      //        s->static_len));
      /* At this point, opt_len and static_len are the total bit lengths of
       * the compressed block data, excluding the tree representations.
       */

      /* Build the bit length tree for the above two trees, and get the index
       * in bl_order of the last bit length code to send.
       */
      max_blindex = build_bl_tree(s);

      /* Determine the best encoding. Compute the block lengths in bytes. */
      opt_lenb = (s.opt_len + 3 + 7) >>> 3;
      static_lenb = (s.static_len + 3 + 7) >>> 3;

      // Tracev((stderr, "\nopt %lu(%lu) stat %lu(%lu) stored %lu lit %u ",
      //        opt_lenb, s->opt_len, static_lenb, s->static_len, stored_len,
      //        s->last_lit));

      if (static_lenb <= opt_lenb) {
        opt_lenb = static_lenb;
      }

    } else {
      // Assert(buf != (char*)0, "lost buf");
      opt_lenb = static_lenb = stored_len + 5; /* force a stored block */
    }

    if ((stored_len + 4 <= opt_lenb) && (buf !== -1)) {
      /* 4: two words for the lengths */

      /* The test buf != NULL is only necessary if LIT_BUFSIZE > WSIZE.
       * Otherwise we can't have processed more than WSIZE input bytes since
       * the last block flush, because compression would have been
       * successful. If LIT_BUFSIZE <= WSIZE, it is never too late to
       * transform a block into a stored block.
       */
      _tr_stored_block(s, buf, stored_len, last);

    } else if (s.strategy === Z_FIXED$2 || static_lenb === opt_lenb) {

      send_bits(s, (STATIC_TREES << 1) + (last ? 1 : 0), 3);
      compress_block(s, static_ltree, static_dtree);

    } else {
      send_bits(s, (DYN_TREES << 1) + (last ? 1 : 0), 3);
      send_all_trees(s, s.l_desc.max_code + 1, s.d_desc.max_code + 1, max_blindex + 1);
      compress_block(s, s.dyn_ltree, s.dyn_dtree);
    }
    // Assert (s->compressed_len == s->bits_sent, "bad compressed size");
    /* The above check is made mod 2^32, for files larger than 512 MB
     * and uLong implemented on 32 bits.
     */
    init_block(s);

    if (last) {
      bi_windup(s);
    }
    // Tracev((stderr,"\ncomprlen %lu(%lu) ", s->compressed_len>>3,
    //       s->compressed_len-7*last));
  }

  /* ===========================================================================
   * Save the match info and tally the frequency counts. Return true if
   * the current block must be flushed.
   */
  function _tr_tally(s, dist, lc)
  //    deflate_state *s;
  //    unsigned dist;  /* distance of matched string */
  //    unsigned lc;    /* match length-MIN_MATCH or unmatched char (if dist==0) */
  {
    //var out_length, in_length, dcode;

    s.pending_buf[s.d_buf + s.last_lit * 2] = (dist >>> 8) & 0xff;
    s.pending_buf[s.d_buf + s.last_lit * 2 + 1] = dist & 0xff;

    s.pending_buf[s.l_buf + s.last_lit] = lc & 0xff;
    s.last_lit++;

    if (dist === 0) {
      /* lc is the unmatched char */
      s.dyn_ltree[lc * 2] /*.Freq*/ ++;
    } else {
      s.matches++;
      /* Here, lc is the match length - MIN_MATCH */
      dist--; /* dist = match distance - 1 */
      //Assert((ush)dist < (ush)MAX_DIST(s) &&
      //       (ush)lc <= (ush)(MAX_MATCH-MIN_MATCH) &&
      //       (ush)d_code(dist) < (ush)D_CODES,  "_tr_tally: bad match");

      s.dyn_ltree[(_length_code[lc] + LITERALS$1 + 1) * 2] /*.Freq*/ ++;
      s.dyn_dtree[d_code(dist) * 2] /*.Freq*/ ++;
    }

    // (!) This block is disabled in zlib defailts,
    // don't enable it for binary compatibility

    //#ifdef TRUNCATE_BLOCK
    //  /* Try to guess if it is profitable to stop the current block here */
    //  if ((s.last_lit & 0x1fff) === 0 && s.level > 2) {
    //    /* Compute an upper bound for the compressed length */
    //    out_length = s.last_lit*8;
    //    in_length = s.strstart - s.block_start;
    //
    //    for (dcode = 0; dcode < D_CODES; dcode++) {
    //      out_length += s.dyn_dtree[dcode*2]/*.Freq*/ * (5 + extra_dbits[dcode]);
    //    }
    //    out_length >>>= 3;
    //    //Tracev((stderr,"\nlast_lit %u, in %ld, out ~%ld(%ld%%) ",
    //    //       s->last_lit, in_length, out_length,
    //    //       100L - out_length*100L/in_length));
    //    if (s.matches < (s.last_lit>>1)/*int /2*/ && out_length < (in_length>>1)/*int /2*/) {
    //      return true;
    //    }
    //  }
    //#endif

    return (s.last_lit === s.lit_bufsize - 1);
    /* We avoid equality with lit_bufsize because of wraparound at 64K
     * on 16 bit machines and because stored blocks are restricted to
     * 64K-1 bytes.
     */
  }

  // Note: adler32 takes 12% for level 0 and 2% for level 6.
  // It doesn't worth to make additional optimizationa as in original.
  // Small size is preferable.

  function adler32(adler, buf, len, pos) {
    var s1 = (adler & 0xffff) |0,
        s2 = ((adler >>> 16) & 0xffff) |0,
        n = 0;

    while (len !== 0) {
      // Set limit ~ twice less than 5552, to keep
      // s2 in 31-bits, because we force signed ints.
      // in other case %= will fail.
      n = len > 2000 ? 2000 : len;
      len -= n;

      do {
        s1 = (s1 + buf[pos++]) |0;
        s2 = (s2 + s1) |0;
      } while (--n);

      s1 %= 65521;
      s2 %= 65521;
    }

    return (s1 | (s2 << 16)) |0;
  }

  // Note: we can't get significant speed boost here.
  // So write code to minimize size - no pregenerated tables
  // and array tools dependencies.


  // Use ordinary array, since untyped makes no boost here
  function makeTable() {
    var c, table = [];

    for (var n = 0; n < 256; n++) {
      c = n;
      for (var k = 0; k < 8; k++) {
        c = ((c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1));
      }
      table[n] = c;
    }

    return table;
  }

  // Create table on load. Just 255 signed longs. Not a problem.
  var crcTable = makeTable();


  function crc32(crc, buf, len, pos) {
    var t = crcTable,
        end = pos + len;

    crc ^= -1;

    for (var i = pos; i < end; i++) {
      crc = (crc >>> 8) ^ t[(crc ^ buf[i]) & 0xFF];
    }

    return (crc ^ (-1)); // >>> 0;
  }

  /* Public constants ==========================================================*/
  /* ===========================================================================*/


  /* Allowed flush values; see deflate() and inflate() below for details */
  var Z_NO_FLUSH$1 = 0;
  var Z_PARTIAL_FLUSH$1 = 1;
  //var Z_SYNC_FLUSH    = 2;
  var Z_FULL_FLUSH$1 = 3;
  var Z_FINISH$2 = 4;
  var Z_BLOCK$2 = 5;
  //var Z_TREES         = 6;


  /* Return codes for the compression/decompression functions. Negative values
   * are errors, positive values are used for special but normal events.
   */
  var Z_OK$2 = 0;
  var Z_STREAM_END$2 = 1;
  //var Z_NEED_DICT     = 2;
  //var Z_ERRNO         = -1;
  var Z_STREAM_ERROR$2 = -2;
  var Z_DATA_ERROR$2 = -3;
  //var Z_MEM_ERROR     = -4;
  var Z_BUF_ERROR$2 = -5;
  //var Z_VERSION_ERROR = -6;


  /* compression levels */
  //var Z_NO_COMPRESSION      = 0;
  //var Z_BEST_SPEED          = 1;
  //var Z_BEST_COMPRESSION    = 9;
  var Z_DEFAULT_COMPRESSION$1 = -1;


  var Z_FILTERED$1 = 1;
  var Z_HUFFMAN_ONLY$1 = 2;
  var Z_RLE$1 = 3;
  var Z_FIXED$1 = 4;

  /* Possible values of the data_type field (though see inflate()) */
  //var Z_BINARY              = 0;
  //var Z_TEXT                = 1;
  //var Z_ASCII               = 1; // = Z_TEXT
  var Z_UNKNOWN$1 = 2;


  /* The deflate compression method */
  var Z_DEFLATED$2 = 8;

  /*============================================================================*/


  var MAX_MEM_LEVEL = 9;


  var LENGTH_CODES = 29;
  /* number of length codes, not counting the special END_BLOCK code */
  var LITERALS = 256;
  /* number of literal bytes 0..255 */
  var L_CODES = LITERALS + 1 + LENGTH_CODES;
  /* number of Literal or Length codes, including the END_BLOCK code */
  var D_CODES = 30;
  /* number of distance codes */
  var BL_CODES = 19;
  /* number of codes used to transfer the bit lengths */
  var HEAP_SIZE = 2 * L_CODES + 1;
  /* maximum heap size */
  var MAX_BITS = 15;
  /* All codes must not exceed MAX_BITS bits */

  var MIN_MATCH = 3;
  var MAX_MATCH = 258;
  var MIN_LOOKAHEAD = (MAX_MATCH + MIN_MATCH + 1);

  var PRESET_DICT = 0x20;

  var INIT_STATE = 42;
  var EXTRA_STATE = 69;
  var NAME_STATE = 73;
  var COMMENT_STATE = 91;
  var HCRC_STATE = 103;
  var BUSY_STATE = 113;
  var FINISH_STATE = 666;

  var BS_NEED_MORE = 1; /* block not completed, need more input or more output */
  var BS_BLOCK_DONE = 2; /* block flush performed */
  var BS_FINISH_STARTED = 3; /* finish started, need only more output at next deflate */
  var BS_FINISH_DONE = 4; /* finish done, accept no more input or output */

  var OS_CODE = 0x03; // Unix :) . Don't detect, use this default.

  function err(strm, errorCode) {
    strm.msg = msg[errorCode];
    return errorCode;
  }

  function rank(f) {
    return ((f) << 1) - ((f) > 4 ? 9 : 0);
  }

  function zero(buf) {
    var len = buf.length;
    while (--len >= 0) {
      buf[len] = 0;
    }
  }


  /* =========================================================================
   * Flush as much pending output as possible. All deflate() output goes
   * through this function so some applications may wish to modify it
   * to avoid allocating a large strm->output buffer and copying into it.
   * (See also read_buf()).
   */
  function flush_pending(strm) {
    var s = strm.state;

    //_tr_flush_bits(s);
    var len = s.pending;
    if (len > strm.avail_out) {
      len = strm.avail_out;
    }
    if (len === 0) {
      return;
    }

    arraySet(strm.output, s.pending_buf, s.pending_out, len, strm.next_out);
    strm.next_out += len;
    s.pending_out += len;
    strm.total_out += len;
    strm.avail_out -= len;
    s.pending -= len;
    if (s.pending === 0) {
      s.pending_out = 0;
    }
  }


  function flush_block_only(s, last) {
    _tr_flush_block(s, (s.block_start >= 0 ? s.block_start : -1), s.strstart - s.block_start, last);
    s.block_start = s.strstart;
    flush_pending(s.strm);
  }


  function put_byte(s, b) {
    s.pending_buf[s.pending++] = b;
  }


  /* =========================================================================
   * Put a short in the pending buffer. The 16-bit value is put in MSB order.
   * IN assertion: the stream state is correct and there is enough room in
   * pending_buf.
   */
  function putShortMSB(s, b) {
    //  put_byte(s, (Byte)(b >> 8));
    //  put_byte(s, (Byte)(b & 0xff));
    s.pending_buf[s.pending++] = (b >>> 8) & 0xff;
    s.pending_buf[s.pending++] = b & 0xff;
  }


  /* ===========================================================================
   * Read a new buffer from the current input stream, update the adler32
   * and total number of bytes read.  All deflate() input goes through
   * this function so some applications may wish to modify it to avoid
   * allocating a large strm->input buffer and copying from it.
   * (See also flush_pending()).
   */
  function read_buf(strm, buf, start, size) {
    var len = strm.avail_in;

    if (len > size) {
      len = size;
    }
    if (len === 0) {
      return 0;
    }

    strm.avail_in -= len;

    // zmemcpy(buf, strm->next_in, len);
    arraySet(buf, strm.input, strm.next_in, len, start);
    if (strm.state.wrap === 1) {
      strm.adler = adler32(strm.adler, buf, len, start);
    } else if (strm.state.wrap === 2) {
      strm.adler = crc32(strm.adler, buf, len, start);
    }

    strm.next_in += len;
    strm.total_in += len;

    return len;
  }


  /* ===========================================================================
   * Set match_start to the longest match starting at the given string and
   * return its length. Matches shorter or equal to prev_length are discarded,
   * in which case the result is equal to prev_length and match_start is
   * garbage.
   * IN assertions: cur_match is the head of the hash chain for the current
   *   string (strstart) and its distance is <= MAX_DIST, and prev_length >= 1
   * OUT assertion: the match length is not greater than s->lookahead.
   */
  function longest_match(s, cur_match) {
    var chain_length = s.max_chain_length; /* max hash chain length */
    var scan = s.strstart; /* current string */
    var match; /* matched string */
    var len; /* length of current match */
    var best_len = s.prev_length; /* best match length so far */
    var nice_match = s.nice_match; /* stop if match long enough */
    var limit = (s.strstart > (s.w_size - MIN_LOOKAHEAD)) ?
      s.strstart - (s.w_size - MIN_LOOKAHEAD) : 0 /*NIL*/ ;

    var _win = s.window; // shortcut

    var wmask = s.w_mask;
    var prev = s.prev;

    /* Stop when cur_match becomes <= limit. To simplify the code,
     * we prevent matches with the string of window index 0.
     */

    var strend = s.strstart + MAX_MATCH;
    var scan_end1 = _win[scan + best_len - 1];
    var scan_end = _win[scan + best_len];

    /* The code is optimized for HASH_BITS >= 8 and MAX_MATCH-2 multiple of 16.
     * It is easy to get rid of this optimization if necessary.
     */
    // Assert(s->hash_bits >= 8 && MAX_MATCH == 258, "Code too clever");

    /* Do not waste too much time if we already have a good match: */
    if (s.prev_length >= s.good_match) {
      chain_length >>= 2;
    }
    /* Do not look for matches beyond the end of the input. This is necessary
     * to make deflate deterministic.
     */
    if (nice_match > s.lookahead) {
      nice_match = s.lookahead;
    }

    // Assert((ulg)s->strstart <= s->window_size-MIN_LOOKAHEAD, "need lookahead");

    do {
      // Assert(cur_match < s->strstart, "no future");
      match = cur_match;

      /* Skip to next match if the match length cannot increase
       * or if the match length is less than 2.  Note that the checks below
       * for insufficient lookahead only occur occasionally for performance
       * reasons.  Therefore uninitialized memory will be accessed, and
       * conditional jumps will be made that depend on those values.
       * However the length of the match is limited to the lookahead, so
       * the output of deflate is not affected by the uninitialized values.
       */

      if (_win[match + best_len] !== scan_end ||
        _win[match + best_len - 1] !== scan_end1 ||
        _win[match] !== _win[scan] ||
        _win[++match] !== _win[scan + 1]) {
        continue;
      }

      /* The check at best_len-1 can be removed because it will be made
       * again later. (This heuristic is not always a win.)
       * It is not necessary to compare scan[2] and match[2] since they
       * are always equal when the other bytes match, given that
       * the hash keys are equal and that HASH_BITS >= 8.
       */
      scan += 2;
      match++;
      // Assert(*scan == *match, "match[2]?");

      /* We check for insufficient lookahead only every 8th comparison;
       * the 256th check will be made at strstart+258.
       */
      do {
        /*jshint noempty:false*/
      } while (_win[++scan] === _win[++match] && _win[++scan] === _win[++match] &&
        _win[++scan] === _win[++match] && _win[++scan] === _win[++match] &&
        _win[++scan] === _win[++match] && _win[++scan] === _win[++match] &&
        _win[++scan] === _win[++match] && _win[++scan] === _win[++match] &&
        scan < strend);

      // Assert(scan <= s->window+(unsigned)(s->window_size-1), "wild scan");

      len = MAX_MATCH - (strend - scan);
      scan = strend - MAX_MATCH;

      if (len > best_len) {
        s.match_start = cur_match;
        best_len = len;
        if (len >= nice_match) {
          break;
        }
        scan_end1 = _win[scan + best_len - 1];
        scan_end = _win[scan + best_len];
      }
    } while ((cur_match = prev[cur_match & wmask]) > limit && --chain_length !== 0);

    if (best_len <= s.lookahead) {
      return best_len;
    }
    return s.lookahead;
  }


  /* ===========================================================================
   * Fill the window when the lookahead becomes insufficient.
   * Updates strstart and lookahead.
   *
   * IN assertion: lookahead < MIN_LOOKAHEAD
   * OUT assertions: strstart <= window_size-MIN_LOOKAHEAD
   *    At least one byte has been read, or avail_in == 0; reads are
   *    performed for at least two bytes (required for the zip translate_eol
   *    option -- not supported here).
   */
  function fill_window(s) {
    var _w_size = s.w_size;
    var p, n, m, more, str;

    //Assert(s->lookahead < MIN_LOOKAHEAD, "already enough lookahead");

    do {
      more = s.window_size - s.lookahead - s.strstart;

      // JS ints have 32 bit, block below not needed
      /* Deal with !@#$% 64K limit: */
      //if (sizeof(int) <= 2) {
      //    if (more == 0 && s->strstart == 0 && s->lookahead == 0) {
      //        more = wsize;
      //
      //  } else if (more == (unsigned)(-1)) {
      //        /* Very unlikely, but possible on 16 bit machine if
      //         * strstart == 0 && lookahead == 1 (input done a byte at time)
      //         */
      //        more--;
      //    }
      //}


      /* If the window is almost full and there is insufficient lookahead,
       * move the upper half to the lower one to make room in the upper half.
       */
      if (s.strstart >= _w_size + (_w_size - MIN_LOOKAHEAD)) {

        arraySet(s.window, s.window, _w_size, _w_size, 0);
        s.match_start -= _w_size;
        s.strstart -= _w_size;
        /* we now have strstart >= MAX_DIST */
        s.block_start -= _w_size;

        /* Slide the hash table (could be avoided with 32 bit values
         at the expense of memory usage). We slide even when level == 0
         to keep the hash table consistent if we switch back to level > 0
         later. (Using level 0 permanently is not an optimal usage of
         zlib, so we don't care about this pathological case.)
         */

        n = s.hash_size;
        p = n;
        do {
          m = s.head[--p];
          s.head[p] = (m >= _w_size ? m - _w_size : 0);
        } while (--n);

        n = _w_size;
        p = n;
        do {
          m = s.prev[--p];
          s.prev[p] = (m >= _w_size ? m - _w_size : 0);
          /* If n is not on any hash chain, prev[n] is garbage but
           * its value will never be used.
           */
        } while (--n);

        more += _w_size;
      }
      if (s.strm.avail_in === 0) {
        break;
      }

      /* If there was no sliding:
       *    strstart <= WSIZE+MAX_DIST-1 && lookahead <= MIN_LOOKAHEAD - 1 &&
       *    more == window_size - lookahead - strstart
       * => more >= window_size - (MIN_LOOKAHEAD-1 + WSIZE + MAX_DIST-1)
       * => more >= window_size - 2*WSIZE + 2
       * In the BIG_MEM or MMAP case (not yet supported),
       *   window_size == input_size + MIN_LOOKAHEAD  &&
       *   strstart + s->lookahead <= input_size => more >= MIN_LOOKAHEAD.
       * Otherwise, window_size == 2*WSIZE so more >= 2.
       * If there was sliding, more >= WSIZE. So in all cases, more >= 2.
       */
      //Assert(more >= 2, "more < 2");
      n = read_buf(s.strm, s.window, s.strstart + s.lookahead, more);
      s.lookahead += n;

      /* Initialize the hash value now that we have some input: */
      if (s.lookahead + s.insert >= MIN_MATCH) {
        str = s.strstart - s.insert;
        s.ins_h = s.window[str];

        /* UPDATE_HASH(s, s->ins_h, s->window[str + 1]); */
        s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[str + 1]) & s.hash_mask;
        //#if MIN_MATCH != 3
        //        Call update_hash() MIN_MATCH-3 more times
        //#endif
        while (s.insert) {
          /* UPDATE_HASH(s, s->ins_h, s->window[str + MIN_MATCH-1]); */
          s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[str + MIN_MATCH - 1]) & s.hash_mask;

          s.prev[str & s.w_mask] = s.head[s.ins_h];
          s.head[s.ins_h] = str;
          str++;
          s.insert--;
          if (s.lookahead + s.insert < MIN_MATCH) {
            break;
          }
        }
      }
      /* If the whole input has less than MIN_MATCH bytes, ins_h is garbage,
       * but this is not important since only literal bytes will be emitted.
       */

    } while (s.lookahead < MIN_LOOKAHEAD && s.strm.avail_in !== 0);

    /* If the WIN_INIT bytes after the end of the current data have never been
     * written, then zero those bytes in order to avoid memory check reports of
     * the use of uninitialized (or uninitialised as Julian writes) bytes by
     * the longest match routines.  Update the high water mark for the next
     * time through here.  WIN_INIT is set to MAX_MATCH since the longest match
     * routines allow scanning to strstart + MAX_MATCH, ignoring lookahead.
     */
    //  if (s.high_water < s.window_size) {
    //    var curr = s.strstart + s.lookahead;
    //    var init = 0;
    //
    //    if (s.high_water < curr) {
    //      /* Previous high water mark below current data -- zero WIN_INIT
    //       * bytes or up to end of window, whichever is less.
    //       */
    //      init = s.window_size - curr;
    //      if (init > WIN_INIT)
    //        init = WIN_INIT;
    //      zmemzero(s->window + curr, (unsigned)init);
    //      s->high_water = curr + init;
    //    }
    //    else if (s->high_water < (ulg)curr + WIN_INIT) {
    //      /* High water mark at or above current data, but below current data
    //       * plus WIN_INIT -- zero out to current data plus WIN_INIT, or up
    //       * to end of window, whichever is less.
    //       */
    //      init = (ulg)curr + WIN_INIT - s->high_water;
    //      if (init > s->window_size - s->high_water)
    //        init = s->window_size - s->high_water;
    //      zmemzero(s->window + s->high_water, (unsigned)init);
    //      s->high_water += init;
    //    }
    //  }
    //
    //  Assert((ulg)s->strstart <= s->window_size - MIN_LOOKAHEAD,
    //    "not enough room for search");
  }

  /* ===========================================================================
   * Copy without compression as much as possible from the input stream, return
   * the current block state.
   * This function does not insert new strings in the dictionary since
   * uncompressible data is probably not useful. This function is used
   * only for the level=0 compression option.
   * NOTE: this function should be optimized to avoid extra copying from
   * window to pending_buf.
   */
  function deflate_stored(s, flush) {
    /* Stored blocks are limited to 0xffff bytes, pending_buf is limited
     * to pending_buf_size, and each stored block has a 5 byte header:
     */
    var max_block_size = 0xffff;

    if (max_block_size > s.pending_buf_size - 5) {
      max_block_size = s.pending_buf_size - 5;
    }

    /* Copy as much as possible from input to output: */
    for (;;) {
      /* Fill the window as much as possible: */
      if (s.lookahead <= 1) {

        //Assert(s->strstart < s->w_size+MAX_DIST(s) ||
        //  s->block_start >= (long)s->w_size, "slide too late");
        //      if (!(s.strstart < s.w_size + (s.w_size - MIN_LOOKAHEAD) ||
        //        s.block_start >= s.w_size)) {
        //        throw  new Error("slide too late");
        //      }

        fill_window(s);
        if (s.lookahead === 0 && flush === Z_NO_FLUSH$1) {
          return BS_NEED_MORE;
        }

        if (s.lookahead === 0) {
          break;
        }
        /* flush the current block */
      }
      //Assert(s->block_start >= 0L, "block gone");
      //    if (s.block_start < 0) throw new Error("block gone");

      s.strstart += s.lookahead;
      s.lookahead = 0;

      /* Emit a stored block if pending_buf will be full: */
      var max_start = s.block_start + max_block_size;

      if (s.strstart === 0 || s.strstart >= max_start) {
        /* strstart == 0 is possible when wraparound on 16-bit machine */
        s.lookahead = s.strstart - max_start;
        s.strstart = max_start;
        /*** FLUSH_BLOCK(s, 0); ***/
        flush_block_only(s, false);
        if (s.strm.avail_out === 0) {
          return BS_NEED_MORE;
        }
        /***/


      }
      /* Flush if we may have to slide, otherwise block_start may become
       * negative and the data will be gone:
       */
      if (s.strstart - s.block_start >= (s.w_size - MIN_LOOKAHEAD)) {
        /*** FLUSH_BLOCK(s, 0); ***/
        flush_block_only(s, false);
        if (s.strm.avail_out === 0) {
          return BS_NEED_MORE;
        }
        /***/
      }
    }

    s.insert = 0;

    if (flush === Z_FINISH$2) {
      /*** FLUSH_BLOCK(s, 1); ***/
      flush_block_only(s, true);
      if (s.strm.avail_out === 0) {
        return BS_FINISH_STARTED;
      }
      /***/
      return BS_FINISH_DONE;
    }

    if (s.strstart > s.block_start) {
      /*** FLUSH_BLOCK(s, 0); ***/
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
      /***/
    }

    return BS_NEED_MORE;
  }

  /* ===========================================================================
   * Compress as much as possible from the input stream, return the current
   * block state.
   * This function does not perform lazy evaluation of matches and inserts
   * new strings in the dictionary only for unmatched strings or for short
   * matches. It is used only for the fast compression options.
   */
  function deflate_fast(s, flush) {
    var hash_head; /* head of the hash chain */
    var bflush; /* set if current block must be flushed */

    for (;;) {
      /* Make sure that we always have enough lookahead, except
       * at the end of the input file. We need MAX_MATCH bytes
       * for the next match, plus MIN_MATCH bytes to insert the
       * string following the next match.
       */
      if (s.lookahead < MIN_LOOKAHEAD) {
        fill_window(s);
        if (s.lookahead < MIN_LOOKAHEAD && flush === Z_NO_FLUSH$1) {
          return BS_NEED_MORE;
        }
        if (s.lookahead === 0) {
          break; /* flush the current block */
        }
      }

      /* Insert the string window[strstart .. strstart+2] in the
       * dictionary, and set hash_head to the head of the hash chain:
       */
      hash_head = 0 /*NIL*/ ;
      if (s.lookahead >= MIN_MATCH) {
        /*** INSERT_STRING(s, s.strstart, hash_head); ***/
        s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
        hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
        s.head[s.ins_h] = s.strstart;
        /***/
      }

      /* Find the longest match, discarding those <= prev_length.
       * At this point we have always match_length < MIN_MATCH
       */
      if (hash_head !== 0 /*NIL*/ && ((s.strstart - hash_head) <= (s.w_size - MIN_LOOKAHEAD))) {
        /* To simplify the code, we prevent matches with the string
         * of window index 0 (in particular we have to avoid a match
         * of the string with itself at the start of the input file).
         */
        s.match_length = longest_match(s, hash_head);
        /* longest_match() sets match_start */
      }
      if (s.match_length >= MIN_MATCH) {
        // check_match(s, s.strstart, s.match_start, s.match_length); // for debug only

        /*** _tr_tally_dist(s, s.strstart - s.match_start,
                       s.match_length - MIN_MATCH, bflush); ***/
        bflush = _tr_tally(s, s.strstart - s.match_start, s.match_length - MIN_MATCH);

        s.lookahead -= s.match_length;

        /* Insert new strings in the hash table only if the match length
         * is not too large. This saves time but degrades compression.
         */
        if (s.match_length <= s.max_lazy_match /*max_insert_length*/ && s.lookahead >= MIN_MATCH) {
          s.match_length--; /* string at strstart already in table */
          do {
            s.strstart++;
            /*** INSERT_STRING(s, s.strstart, hash_head); ***/
            s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
            hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
            s.head[s.ins_h] = s.strstart;
            /***/
            /* strstart never exceeds WSIZE-MAX_MATCH, so there are
             * always MIN_MATCH bytes ahead.
             */
          } while (--s.match_length !== 0);
          s.strstart++;
        } else {
          s.strstart += s.match_length;
          s.match_length = 0;
          s.ins_h = s.window[s.strstart];
          /* UPDATE_HASH(s, s.ins_h, s.window[s.strstart+1]); */
          s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + 1]) & s.hash_mask;

          //#if MIN_MATCH != 3
          //                Call UPDATE_HASH() MIN_MATCH-3 more times
          //#endif
          /* If lookahead < MIN_MATCH, ins_h is garbage, but it does not
           * matter since it will be recomputed at next deflate call.
           */
        }
      } else {
        /* No match, output a literal byte */
        //Tracevv((stderr,"%c", s.window[s.strstart]));
        /*** _tr_tally_lit(s, s.window[s.strstart], bflush); ***/
        bflush = _tr_tally(s, 0, s.window[s.strstart]);

        s.lookahead--;
        s.strstart++;
      }
      if (bflush) {
        /*** FLUSH_BLOCK(s, 0); ***/
        flush_block_only(s, false);
        if (s.strm.avail_out === 0) {
          return BS_NEED_MORE;
        }
        /***/
      }
    }
    s.insert = ((s.strstart < (MIN_MATCH - 1)) ? s.strstart : MIN_MATCH - 1);
    if (flush === Z_FINISH$2) {
      /*** FLUSH_BLOCK(s, 1); ***/
      flush_block_only(s, true);
      if (s.strm.avail_out === 0) {
        return BS_FINISH_STARTED;
      }
      /***/
      return BS_FINISH_DONE;
    }
    if (s.last_lit) {
      /*** FLUSH_BLOCK(s, 0); ***/
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
      /***/
    }
    return BS_BLOCK_DONE;
  }

  /* ===========================================================================
   * Same as above, but achieves better compression. We use a lazy
   * evaluation for matches: a match is finally adopted only if there is
   * no better match at the next window position.
   */
  function deflate_slow(s, flush) {
    var hash_head; /* head of hash chain */
    var bflush; /* set if current block must be flushed */

    var max_insert;

    /* Process the input block. */
    for (;;) {
      /* Make sure that we always have enough lookahead, except
       * at the end of the input file. We need MAX_MATCH bytes
       * for the next match, plus MIN_MATCH bytes to insert the
       * string following the next match.
       */
      if (s.lookahead < MIN_LOOKAHEAD) {
        fill_window(s);
        if (s.lookahead < MIN_LOOKAHEAD && flush === Z_NO_FLUSH$1) {
          return BS_NEED_MORE;
        }
        if (s.lookahead === 0) {
          break;
        } /* flush the current block */
      }

      /* Insert the string window[strstart .. strstart+2] in the
       * dictionary, and set hash_head to the head of the hash chain:
       */
      hash_head = 0 /*NIL*/ ;
      if (s.lookahead >= MIN_MATCH) {
        /*** INSERT_STRING(s, s.strstart, hash_head); ***/
        s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
        hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
        s.head[s.ins_h] = s.strstart;
        /***/
      }

      /* Find the longest match, discarding those <= prev_length.
       */
      s.prev_length = s.match_length;
      s.prev_match = s.match_start;
      s.match_length = MIN_MATCH - 1;

      if (hash_head !== 0 /*NIL*/ && s.prev_length < s.max_lazy_match &&
        s.strstart - hash_head <= (s.w_size - MIN_LOOKAHEAD) /*MAX_DIST(s)*/ ) {
        /* To simplify the code, we prevent matches with the string
         * of window index 0 (in particular we have to avoid a match
         * of the string with itself at the start of the input file).
         */
        s.match_length = longest_match(s, hash_head);
        /* longest_match() sets match_start */

        if (s.match_length <= 5 &&
          (s.strategy === Z_FILTERED$1 || (s.match_length === MIN_MATCH && s.strstart - s.match_start > 4096 /*TOO_FAR*/ ))) {

          /* If prev_match is also MIN_MATCH, match_start is garbage
           * but we will ignore the current match anyway.
           */
          s.match_length = MIN_MATCH - 1;
        }
      }
      /* If there was a match at the previous step and the current
       * match is not better, output the previous match:
       */
      if (s.prev_length >= MIN_MATCH && s.match_length <= s.prev_length) {
        max_insert = s.strstart + s.lookahead - MIN_MATCH;
        /* Do not insert strings in hash table beyond this. */

        //check_match(s, s.strstart-1, s.prev_match, s.prev_length);

        /***_tr_tally_dist(s, s.strstart - 1 - s.prev_match,
                       s.prev_length - MIN_MATCH, bflush);***/
        bflush = _tr_tally(s, s.strstart - 1 - s.prev_match, s.prev_length - MIN_MATCH);
        /* Insert in hash table all strings up to the end of the match.
         * strstart-1 and strstart are already inserted. If there is not
         * enough lookahead, the last two strings are not inserted in
         * the hash table.
         */
        s.lookahead -= s.prev_length - 1;
        s.prev_length -= 2;
        do {
          if (++s.strstart <= max_insert) {
            /*** INSERT_STRING(s, s.strstart, hash_head); ***/
            s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
            hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
            s.head[s.ins_h] = s.strstart;
            /***/
          }
        } while (--s.prev_length !== 0);
        s.match_available = 0;
        s.match_length = MIN_MATCH - 1;
        s.strstart++;

        if (bflush) {
          /*** FLUSH_BLOCK(s, 0); ***/
          flush_block_only(s, false);
          if (s.strm.avail_out === 0) {
            return BS_NEED_MORE;
          }
          /***/
        }

      } else if (s.match_available) {
        /* If there was no match at the previous position, output a
         * single literal. If there was a match but the current match
         * is longer, truncate the previous match to a single literal.
         */
        //Tracevv((stderr,"%c", s->window[s->strstart-1]));
        /*** _tr_tally_lit(s, s.window[s.strstart-1], bflush); ***/
        bflush = _tr_tally(s, 0, s.window[s.strstart - 1]);

        if (bflush) {
          /*** FLUSH_BLOCK_ONLY(s, 0) ***/
          flush_block_only(s, false);
          /***/
        }
        s.strstart++;
        s.lookahead--;
        if (s.strm.avail_out === 0) {
          return BS_NEED_MORE;
        }
      } else {
        /* There is no previous match to compare with, wait for
         * the next step to decide.
         */
        s.match_available = 1;
        s.strstart++;
        s.lookahead--;
      }
    }
    //Assert (flush != Z_NO_FLUSH, "no flush?");
    if (s.match_available) {
      //Tracevv((stderr,"%c", s->window[s->strstart-1]));
      /*** _tr_tally_lit(s, s.window[s.strstart-1], bflush); ***/
      bflush = _tr_tally(s, 0, s.window[s.strstart - 1]);

      s.match_available = 0;
    }
    s.insert = s.strstart < MIN_MATCH - 1 ? s.strstart : MIN_MATCH - 1;
    if (flush === Z_FINISH$2) {
      /*** FLUSH_BLOCK(s, 1); ***/
      flush_block_only(s, true);
      if (s.strm.avail_out === 0) {
        return BS_FINISH_STARTED;
      }
      /***/
      return BS_FINISH_DONE;
    }
    if (s.last_lit) {
      /*** FLUSH_BLOCK(s, 0); ***/
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
      /***/
    }

    return BS_BLOCK_DONE;
  }


  /* ===========================================================================
   * For Z_RLE, simply look for runs of bytes, generate matches only of distance
   * one.  Do not maintain a hash table.  (It will be regenerated if this run of
   * deflate switches away from Z_RLE.)
   */
  function deflate_rle(s, flush) {
    var bflush; /* set if current block must be flushed */
    var prev; /* byte at distance one to match */
    var scan, strend; /* scan goes up to strend for length of run */

    var _win = s.window;

    for (;;) {
      /* Make sure that we always have enough lookahead, except
       * at the end of the input file. We need MAX_MATCH bytes
       * for the longest run, plus one for the unrolled loop.
       */
      if (s.lookahead <= MAX_MATCH) {
        fill_window(s);
        if (s.lookahead <= MAX_MATCH && flush === Z_NO_FLUSH$1) {
          return BS_NEED_MORE;
        }
        if (s.lookahead === 0) {
          break;
        } /* flush the current block */
      }

      /* See how many times the previous byte repeats */
      s.match_length = 0;
      if (s.lookahead >= MIN_MATCH && s.strstart > 0) {
        scan = s.strstart - 1;
        prev = _win[scan];
        if (prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan]) {
          strend = s.strstart + MAX_MATCH;
          do {
            /*jshint noempty:false*/
          } while (prev === _win[++scan] && prev === _win[++scan] &&
            prev === _win[++scan] && prev === _win[++scan] &&
            prev === _win[++scan] && prev === _win[++scan] &&
            prev === _win[++scan] && prev === _win[++scan] &&
            scan < strend);
          s.match_length = MAX_MATCH - (strend - scan);
          if (s.match_length > s.lookahead) {
            s.match_length = s.lookahead;
          }
        }
        //Assert(scan <= s->window+(uInt)(s->window_size-1), "wild scan");
      }

      /* Emit match if have run of MIN_MATCH or longer, else emit literal */
      if (s.match_length >= MIN_MATCH) {
        //check_match(s, s.strstart, s.strstart - 1, s.match_length);

        /*** _tr_tally_dist(s, 1, s.match_length - MIN_MATCH, bflush); ***/
        bflush = _tr_tally(s, 1, s.match_length - MIN_MATCH);

        s.lookahead -= s.match_length;
        s.strstart += s.match_length;
        s.match_length = 0;
      } else {
        /* No match, output a literal byte */
        //Tracevv((stderr,"%c", s->window[s->strstart]));
        /*** _tr_tally_lit(s, s.window[s.strstart], bflush); ***/
        bflush = _tr_tally(s, 0, s.window[s.strstart]);

        s.lookahead--;
        s.strstart++;
      }
      if (bflush) {
        /*** FLUSH_BLOCK(s, 0); ***/
        flush_block_only(s, false);
        if (s.strm.avail_out === 0) {
          return BS_NEED_MORE;
        }
        /***/
      }
    }
    s.insert = 0;
    if (flush === Z_FINISH$2) {
      /*** FLUSH_BLOCK(s, 1); ***/
      flush_block_only(s, true);
      if (s.strm.avail_out === 0) {
        return BS_FINISH_STARTED;
      }
      /***/
      return BS_FINISH_DONE;
    }
    if (s.last_lit) {
      /*** FLUSH_BLOCK(s, 0); ***/
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
      /***/
    }
    return BS_BLOCK_DONE;
  }

  /* ===========================================================================
   * For Z_HUFFMAN_ONLY, do not look for matches.  Do not maintain a hash table.
   * (It will be regenerated if this run of deflate switches away from Huffman.)
   */
  function deflate_huff(s, flush) {
    var bflush; /* set if current block must be flushed */

    for (;;) {
      /* Make sure that we have a literal to write. */
      if (s.lookahead === 0) {
        fill_window(s);
        if (s.lookahead === 0) {
          if (flush === Z_NO_FLUSH$1) {
            return BS_NEED_MORE;
          }
          break; /* flush the current block */
        }
      }

      /* Output a literal byte */
      s.match_length = 0;
      //Tracevv((stderr,"%c", s->window[s->strstart]));
      /*** _tr_tally_lit(s, s.window[s.strstart], bflush); ***/
      bflush = _tr_tally(s, 0, s.window[s.strstart]);
      s.lookahead--;
      s.strstart++;
      if (bflush) {
        /*** FLUSH_BLOCK(s, 0); ***/
        flush_block_only(s, false);
        if (s.strm.avail_out === 0) {
          return BS_NEED_MORE;
        }
        /***/
      }
    }
    s.insert = 0;
    if (flush === Z_FINISH$2) {
      /*** FLUSH_BLOCK(s, 1); ***/
      flush_block_only(s, true);
      if (s.strm.avail_out === 0) {
        return BS_FINISH_STARTED;
      }
      /***/
      return BS_FINISH_DONE;
    }
    if (s.last_lit) {
      /*** FLUSH_BLOCK(s, 0); ***/
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
      /***/
    }
    return BS_BLOCK_DONE;
  }

  /* Values for max_lazy_match, good_match and max_chain_length, depending on
   * the desired pack level (0..9). The values given below have been tuned to
   * exclude worst case performance for pathological files. Better values may be
   * found for specific files.
   */
  function Config(good_length, max_lazy, nice_length, max_chain, func) {
    this.good_length = good_length;
    this.max_lazy = max_lazy;
    this.nice_length = nice_length;
    this.max_chain = max_chain;
    this.func = func;
  }

  var configuration_table;

  configuration_table = [
    /*      good lazy nice chain */
    new Config(0, 0, 0, 0, deflate_stored), /* 0 store only */
    new Config(4, 4, 8, 4, deflate_fast), /* 1 max speed, no lazy matches */
    new Config(4, 5, 16, 8, deflate_fast), /* 2 */
    new Config(4, 6, 32, 32, deflate_fast), /* 3 */

    new Config(4, 4, 16, 16, deflate_slow), /* 4 lazy matches */
    new Config(8, 16, 32, 32, deflate_slow), /* 5 */
    new Config(8, 16, 128, 128, deflate_slow), /* 6 */
    new Config(8, 32, 128, 256, deflate_slow), /* 7 */
    new Config(32, 128, 258, 1024, deflate_slow), /* 8 */
    new Config(32, 258, 258, 4096, deflate_slow) /* 9 max compression */
  ];


  /* ===========================================================================
   * Initialize the "longest match" routines for a new zlib stream
   */
  function lm_init(s) {
    s.window_size = 2 * s.w_size;

    /*** CLEAR_HASH(s); ***/
    zero(s.head); // Fill with NIL (= 0);

    /* Set the default configuration parameters:
     */
    s.max_lazy_match = configuration_table[s.level].max_lazy;
    s.good_match = configuration_table[s.level].good_length;
    s.nice_match = configuration_table[s.level].nice_length;
    s.max_chain_length = configuration_table[s.level].max_chain;

    s.strstart = 0;
    s.block_start = 0;
    s.lookahead = 0;
    s.insert = 0;
    s.match_length = s.prev_length = MIN_MATCH - 1;
    s.match_available = 0;
    s.ins_h = 0;
  }


  function DeflateState() {
    this.strm = null; /* pointer back to this zlib stream */
    this.status = 0; /* as the name implies */
    this.pending_buf = null; /* output still pending */
    this.pending_buf_size = 0; /* size of pending_buf */
    this.pending_out = 0; /* next pending byte to output to the stream */
    this.pending = 0; /* nb of bytes in the pending buffer */
    this.wrap = 0; /* bit 0 true for zlib, bit 1 true for gzip */
    this.gzhead = null; /* gzip header information to write */
    this.gzindex = 0; /* where in extra, name, or comment */
    this.method = Z_DEFLATED$2; /* can only be DEFLATED */
    this.last_flush = -1; /* value of flush param for previous deflate call */

    this.w_size = 0; /* LZ77 window size (32K by default) */
    this.w_bits = 0; /* log2(w_size)  (8..16) */
    this.w_mask = 0; /* w_size - 1 */

    this.window = null;
    /* Sliding window. Input bytes are read into the second half of the window,
     * and move to the first half later to keep a dictionary of at least wSize
     * bytes. With this organization, matches are limited to a distance of
     * wSize-MAX_MATCH bytes, but this ensures that IO is always
     * performed with a length multiple of the block size.
     */

    this.window_size = 0;
    /* Actual size of window: 2*wSize, except when the user input buffer
     * is directly used as sliding window.
     */

    this.prev = null;
    /* Link to older string with same hash index. To limit the size of this
     * array to 64K, this link is maintained only for the last 32K strings.
     * An index in this array is thus a window index modulo 32K.
     */

    this.head = null; /* Heads of the hash chains or NIL. */

    this.ins_h = 0; /* hash index of string to be inserted */
    this.hash_size = 0; /* number of elements in hash table */
    this.hash_bits = 0; /* log2(hash_size) */
    this.hash_mask = 0; /* hash_size-1 */

    this.hash_shift = 0;
    /* Number of bits by which ins_h must be shifted at each input
     * step. It must be such that after MIN_MATCH steps, the oldest
     * byte no longer takes part in the hash key, that is:
     *   hash_shift * MIN_MATCH >= hash_bits
     */

    this.block_start = 0;
    /* Window position at the beginning of the current output block. Gets
     * negative when the window is moved backwards.
     */

    this.match_length = 0; /* length of best match */
    this.prev_match = 0; /* previous match */
    this.match_available = 0; /* set if previous match exists */
    this.strstart = 0; /* start of string to insert */
    this.match_start = 0; /* start of matching string */
    this.lookahead = 0; /* number of valid bytes ahead in window */

    this.prev_length = 0;
    /* Length of the best match at previous step. Matches not greater than this
     * are discarded. This is used in the lazy match evaluation.
     */

    this.max_chain_length = 0;
    /* To speed up deflation, hash chains are never searched beyond this
     * length.  A higher limit improves compression ratio but degrades the
     * speed.
     */

    this.max_lazy_match = 0;
    /* Attempt to find a better match only when the current match is strictly
     * smaller than this value. This mechanism is used only for compression
     * levels >= 4.
     */
    // That's alias to max_lazy_match, don't use directly
    //this.max_insert_length = 0;
    /* Insert new strings in the hash table only if the match length is not
     * greater than this length. This saves time but degrades compression.
     * max_insert_length is used only for compression levels <= 3.
     */

    this.level = 0; /* compression level (1..9) */
    this.strategy = 0; /* favor or force Huffman coding*/

    this.good_match = 0;
    /* Use a faster search when the previous match is longer than this */

    this.nice_match = 0; /* Stop searching when current match exceeds this */

    /* used by c: */

    /* Didn't use ct_data typedef below to suppress compiler warning */

    // struct ct_data_s dyn_ltree[HEAP_SIZE];   /* literal and length tree */
    // struct ct_data_s dyn_dtree[2*D_CODES+1]; /* distance tree */
    // struct ct_data_s bl_tree[2*BL_CODES+1];  /* Huffman tree for bit lengths */

    // Use flat array of DOUBLE size, with interleaved fata,
    // because JS does not support effective
    this.dyn_ltree = new Buf16(HEAP_SIZE * 2);
    this.dyn_dtree = new Buf16((2 * D_CODES + 1) * 2);
    this.bl_tree = new Buf16((2 * BL_CODES + 1) * 2);
    zero(this.dyn_ltree);
    zero(this.dyn_dtree);
    zero(this.bl_tree);

    this.l_desc = null; /* desc. for literal tree */
    this.d_desc = null; /* desc. for distance tree */
    this.bl_desc = null; /* desc. for bit length tree */

    //ush bl_count[MAX_BITS+1];
    this.bl_count = new Buf16(MAX_BITS + 1);
    /* number of codes at each bit length for an optimal tree */

    //int heap[2*L_CODES+1];      /* heap used to build the Huffman trees */
    this.heap = new Buf16(2 * L_CODES + 1); /* heap used to build the Huffman trees */
    zero(this.heap);

    this.heap_len = 0; /* number of elements in the heap */
    this.heap_max = 0; /* element of largest frequency */
    /* The sons of heap[n] are heap[2*n] and heap[2*n+1]. heap[0] is not used.
     * The same heap array is used to build all
     */

    this.depth = new Buf16(2 * L_CODES + 1); //uch depth[2*L_CODES+1];
    zero(this.depth);
    /* Depth of each subtree used as tie breaker for trees of equal frequency
     */

    this.l_buf = 0; /* buffer index for literals or lengths */

    this.lit_bufsize = 0;
    /* Size of match buffer for literals/lengths.  There are 4 reasons for
     * limiting lit_bufsize to 64K:
     *   - frequencies can be kept in 16 bit counters
     *   - if compression is not successful for the first block, all input
     *     data is still in the window so we can still emit a stored block even
     *     when input comes from standard input.  (This can also be done for
     *     all blocks if lit_bufsize is not greater than 32K.)
     *   - if compression is not successful for a file smaller than 64K, we can
     *     even emit a stored file instead of a stored block (saving 5 bytes).
     *     This is applicable only for zip (not gzip or zlib).
     *   - creating new Huffman trees less frequently may not provide fast
     *     adaptation to changes in the input data statistics. (Take for
     *     example a binary file with poorly compressible code followed by
     *     a highly compressible string table.) Smaller buffer sizes give
     *     fast adaptation but have of course the overhead of transmitting
     *     trees more frequently.
     *   - I can't count above 4
     */

    this.last_lit = 0; /* running index in l_buf */

    this.d_buf = 0;
    /* Buffer index for distances. To simplify the code, d_buf and l_buf have
     * the same number of elements. To use different lengths, an extra flag
     * array would be necessary.
     */

    this.opt_len = 0; /* bit length of current block with optimal trees */
    this.static_len = 0; /* bit length of current block with static trees */
    this.matches = 0; /* number of string matches in current block */
    this.insert = 0; /* bytes at end of window left to insert */


    this.bi_buf = 0;
    /* Output buffer. bits are inserted starting at the bottom (least
     * significant bits).
     */
    this.bi_valid = 0;
    /* Number of valid bits in bi_buf.  All bits above the last valid bit
     * are always zero.
     */

    // Used for window memory init. We safely ignore it for JS. That makes
    // sense only for pointers and memory check tools.
    //this.high_water = 0;
    /* High water mark offset in window for initialized bytes -- bytes above
     * this are set to zero in order to avoid memory check warnings when
     * longest match routines access bytes past the input.  This is then
     * updated to the new high water mark.
     */
  }


  function deflateResetKeep(strm) {
    var s;

    if (!strm || !strm.state) {
      return err(strm, Z_STREAM_ERROR$2);
    }

    strm.total_in = strm.total_out = 0;
    strm.data_type = Z_UNKNOWN$1;

    s = strm.state;
    s.pending = 0;
    s.pending_out = 0;

    if (s.wrap < 0) {
      s.wrap = -s.wrap;
      /* was made negative by deflate(..., Z_FINISH); */
    }
    s.status = (s.wrap ? INIT_STATE : BUSY_STATE);
    strm.adler = (s.wrap === 2) ?
      0 // crc32(0, Z_NULL, 0)
      :
      1; // adler32(0, Z_NULL, 0)
    s.last_flush = Z_NO_FLUSH$1;
    _tr_init(s);
    return Z_OK$2;
  }


  function deflateReset(strm) {
    var ret = deflateResetKeep(strm);
    if (ret === Z_OK$2) {
      lm_init(strm.state);
    }
    return ret;
  }


  function deflateInit2(strm, level, method, windowBits, memLevel, strategy) {
    if (!strm) { // === Z_NULL
      return Z_STREAM_ERROR$2;
    }
    var wrap = 1;

    if (level === Z_DEFAULT_COMPRESSION$1) {
      level = 6;
    }

    if (windowBits < 0) { /* suppress zlib wrapper */
      wrap = 0;
      windowBits = -windowBits;
    } else if (windowBits > 15) {
      wrap = 2; /* write gzip wrapper instead */
      windowBits -= 16;
    }


    if (memLevel < 1 || memLevel > MAX_MEM_LEVEL || method !== Z_DEFLATED$2 ||
      windowBits < 8 || windowBits > 15 || level < 0 || level > 9 ||
      strategy < 0 || strategy > Z_FIXED$1) {
      return err(strm, Z_STREAM_ERROR$2);
    }


    if (windowBits === 8) {
      windowBits = 9;
    }
    /* until 256-byte window bug fixed */

    var s = new DeflateState();

    strm.state = s;
    s.strm = strm;

    s.wrap = wrap;
    s.gzhead = null;
    s.w_bits = windowBits;
    s.w_size = 1 << s.w_bits;
    s.w_mask = s.w_size - 1;

    s.hash_bits = memLevel + 7;
    s.hash_size = 1 << s.hash_bits;
    s.hash_mask = s.hash_size - 1;
    s.hash_shift = ~~((s.hash_bits + MIN_MATCH - 1) / MIN_MATCH);

    s.window = new Buf8(s.w_size * 2);
    s.head = new Buf16(s.hash_size);
    s.prev = new Buf16(s.w_size);

    // Don't need mem init magic for JS.
    //s.high_water = 0;  /* nothing written to s->window yet */

    s.lit_bufsize = 1 << (memLevel + 6); /* 16K elements by default */

    s.pending_buf_size = s.lit_bufsize * 4;

    //overlay = (ushf *) ZALLOC(strm, s->lit_bufsize, sizeof(ush)+2);
    //s->pending_buf = (uchf *) overlay;
    s.pending_buf = new Buf8(s.pending_buf_size);

    // It is offset from `s.pending_buf` (size is `s.lit_bufsize * 2`)
    //s->d_buf = overlay + s->lit_bufsize/sizeof(ush);
    s.d_buf = 1 * s.lit_bufsize;

    //s->l_buf = s->pending_buf + (1+sizeof(ush))*s->lit_bufsize;
    s.l_buf = (1 + 2) * s.lit_bufsize;

    s.level = level;
    s.strategy = strategy;
    s.method = method;

    return deflateReset(strm);
  }


  function deflate$1(strm, flush) {
    var old_flush, s;
    var beg, val; // for gzip header write only

    if (!strm || !strm.state ||
      flush > Z_BLOCK$2 || flush < 0) {
      return strm ? err(strm, Z_STREAM_ERROR$2) : Z_STREAM_ERROR$2;
    }

    s = strm.state;

    if (!strm.output ||
      (!strm.input && strm.avail_in !== 0) ||
      (s.status === FINISH_STATE && flush !== Z_FINISH$2)) {
      return err(strm, (strm.avail_out === 0) ? Z_BUF_ERROR$2 : Z_STREAM_ERROR$2);
    }

    s.strm = strm; /* just in case */
    old_flush = s.last_flush;
    s.last_flush = flush;

    /* Write the header */
    if (s.status === INIT_STATE) {
      if (s.wrap === 2) {
        // GZIP header
        strm.adler = 0; //crc32(0L, Z_NULL, 0);
        put_byte(s, 31);
        put_byte(s, 139);
        put_byte(s, 8);
        if (!s.gzhead) { // s->gzhead == Z_NULL
          put_byte(s, 0);
          put_byte(s, 0);
          put_byte(s, 0);
          put_byte(s, 0);
          put_byte(s, 0);
          put_byte(s, s.level === 9 ? 2 :
            (s.strategy >= Z_HUFFMAN_ONLY$1 || s.level < 2 ?
              4 : 0));
          put_byte(s, OS_CODE);
          s.status = BUSY_STATE;
        } else {
          put_byte(s, (s.gzhead.text ? 1 : 0) +
            (s.gzhead.hcrc ? 2 : 0) +
            (!s.gzhead.extra ? 0 : 4) +
            (!s.gzhead.name ? 0 : 8) +
            (!s.gzhead.comment ? 0 : 16)
          );
          put_byte(s, s.gzhead.time & 0xff);
          put_byte(s, (s.gzhead.time >> 8) & 0xff);
          put_byte(s, (s.gzhead.time >> 16) & 0xff);
          put_byte(s, (s.gzhead.time >> 24) & 0xff);
          put_byte(s, s.level === 9 ? 2 :
            (s.strategy >= Z_HUFFMAN_ONLY$1 || s.level < 2 ?
              4 : 0));
          put_byte(s, s.gzhead.os & 0xff);
          if (s.gzhead.extra && s.gzhead.extra.length) {
            put_byte(s, s.gzhead.extra.length & 0xff);
            put_byte(s, (s.gzhead.extra.length >> 8) & 0xff);
          }
          if (s.gzhead.hcrc) {
            strm.adler = crc32(strm.adler, s.pending_buf, s.pending, 0);
          }
          s.gzindex = 0;
          s.status = EXTRA_STATE;
        }
      } else // DEFLATE header
      {
        var header = (Z_DEFLATED$2 + ((s.w_bits - 8) << 4)) << 8;
        var level_flags = -1;

        if (s.strategy >= Z_HUFFMAN_ONLY$1 || s.level < 2) {
          level_flags = 0;
        } else if (s.level < 6) {
          level_flags = 1;
        } else if (s.level === 6) {
          level_flags = 2;
        } else {
          level_flags = 3;
        }
        header |= (level_flags << 6);
        if (s.strstart !== 0) {
          header |= PRESET_DICT;
        }
        header += 31 - (header % 31);

        s.status = BUSY_STATE;
        putShortMSB(s, header);

        /* Save the adler32 of the preset dictionary: */
        if (s.strstart !== 0) {
          putShortMSB(s, strm.adler >>> 16);
          putShortMSB(s, strm.adler & 0xffff);
        }
        strm.adler = 1; // adler32(0L, Z_NULL, 0);
      }
    }

    //#ifdef GZIP
    if (s.status === EXTRA_STATE) {
      if (s.gzhead.extra /* != Z_NULL*/ ) {
        beg = s.pending; /* start of bytes to update crc */

        while (s.gzindex < (s.gzhead.extra.length & 0xffff)) {
          if (s.pending === s.pending_buf_size) {
            if (s.gzhead.hcrc && s.pending > beg) {
              strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
            }
            flush_pending(strm);
            beg = s.pending;
            if (s.pending === s.pending_buf_size) {
              break;
            }
          }
          put_byte(s, s.gzhead.extra[s.gzindex] & 0xff);
          s.gzindex++;
        }
        if (s.gzhead.hcrc && s.pending > beg) {
          strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
        }
        if (s.gzindex === s.gzhead.extra.length) {
          s.gzindex = 0;
          s.status = NAME_STATE;
        }
      } else {
        s.status = NAME_STATE;
      }
    }
    if (s.status === NAME_STATE) {
      if (s.gzhead.name /* != Z_NULL*/ ) {
        beg = s.pending; /* start of bytes to update crc */
        //int val;

        do {
          if (s.pending === s.pending_buf_size) {
            if (s.gzhead.hcrc && s.pending > beg) {
              strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
            }
            flush_pending(strm);
            beg = s.pending;
            if (s.pending === s.pending_buf_size) {
              val = 1;
              break;
            }
          }
          // JS specific: little magic to add zero terminator to end of string
          if (s.gzindex < s.gzhead.name.length) {
            val = s.gzhead.name.charCodeAt(s.gzindex++) & 0xff;
          } else {
            val = 0;
          }
          put_byte(s, val);
        } while (val !== 0);

        if (s.gzhead.hcrc && s.pending > beg) {
          strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
        }
        if (val === 0) {
          s.gzindex = 0;
          s.status = COMMENT_STATE;
        }
      } else {
        s.status = COMMENT_STATE;
      }
    }
    if (s.status === COMMENT_STATE) {
      if (s.gzhead.comment /* != Z_NULL*/ ) {
        beg = s.pending; /* start of bytes to update crc */
        //int val;

        do {
          if (s.pending === s.pending_buf_size) {
            if (s.gzhead.hcrc && s.pending > beg) {
              strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
            }
            flush_pending(strm);
            beg = s.pending;
            if (s.pending === s.pending_buf_size) {
              val = 1;
              break;
            }
          }
          // JS specific: little magic to add zero terminator to end of string
          if (s.gzindex < s.gzhead.comment.length) {
            val = s.gzhead.comment.charCodeAt(s.gzindex++) & 0xff;
          } else {
            val = 0;
          }
          put_byte(s, val);
        } while (val !== 0);

        if (s.gzhead.hcrc && s.pending > beg) {
          strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
        }
        if (val === 0) {
          s.status = HCRC_STATE;
        }
      } else {
        s.status = HCRC_STATE;
      }
    }
    if (s.status === HCRC_STATE) {
      if (s.gzhead.hcrc) {
        if (s.pending + 2 > s.pending_buf_size) {
          flush_pending(strm);
        }
        if (s.pending + 2 <= s.pending_buf_size) {
          put_byte(s, strm.adler & 0xff);
          put_byte(s, (strm.adler >> 8) & 0xff);
          strm.adler = 0; //crc32(0L, Z_NULL, 0);
          s.status = BUSY_STATE;
        }
      } else {
        s.status = BUSY_STATE;
      }
    }
    //#endif

    /* Flush as much pending output as possible */
    if (s.pending !== 0) {
      flush_pending(strm);
      if (strm.avail_out === 0) {
        /* Since avail_out is 0, deflate will be called again with
         * more output space, but possibly with both pending and
         * avail_in equal to zero. There won't be anything to do,
         * but this is not an error situation so make sure we
         * return OK instead of BUF_ERROR at next call of deflate:
         */
        s.last_flush = -1;
        return Z_OK$2;
      }

      /* Make sure there is something to do and avoid duplicate consecutive
       * flushes. For repeated and useless calls with Z_FINISH, we keep
       * returning Z_STREAM_END instead of Z_BUF_ERROR.
       */
    } else if (strm.avail_in === 0 && rank(flush) <= rank(old_flush) &&
      flush !== Z_FINISH$2) {
      return err(strm, Z_BUF_ERROR$2);
    }

    /* User must not provide more input after the first FINISH: */
    if (s.status === FINISH_STATE && strm.avail_in !== 0) {
      return err(strm, Z_BUF_ERROR$2);
    }

    /* Start a new block or continue the current one.
     */
    if (strm.avail_in !== 0 || s.lookahead !== 0 ||
      (flush !== Z_NO_FLUSH$1 && s.status !== FINISH_STATE)) {
      var bstate = (s.strategy === Z_HUFFMAN_ONLY$1) ? deflate_huff(s, flush) :
        (s.strategy === Z_RLE$1 ? deflate_rle(s, flush) :
          configuration_table[s.level].func(s, flush));

      if (bstate === BS_FINISH_STARTED || bstate === BS_FINISH_DONE) {
        s.status = FINISH_STATE;
      }
      if (bstate === BS_NEED_MORE || bstate === BS_FINISH_STARTED) {
        if (strm.avail_out === 0) {
          s.last_flush = -1;
          /* avoid BUF_ERROR next call, see above */
        }
        return Z_OK$2;
        /* If flush != Z_NO_FLUSH && avail_out == 0, the next call
         * of deflate should use the same flush parameter to make sure
         * that the flush is complete. So we don't have to output an
         * empty block here, this will be done at next call. This also
         * ensures that for a very small output buffer, we emit at most
         * one empty block.
         */
      }
      if (bstate === BS_BLOCK_DONE) {
        if (flush === Z_PARTIAL_FLUSH$1) {
          _tr_align(s);
        } else if (flush !== Z_BLOCK$2) { /* FULL_FLUSH or SYNC_FLUSH */

          _tr_stored_block(s, 0, 0, false);
          /* For a full flush, this empty block will be recognized
           * as a special marker by inflate_sync().
           */
          if (flush === Z_FULL_FLUSH$1) {
            /*** CLEAR_HASH(s); ***/
            /* forget history */
            zero(s.head); // Fill with NIL (= 0);

            if (s.lookahead === 0) {
              s.strstart = 0;
              s.block_start = 0;
              s.insert = 0;
            }
          }
        }
        flush_pending(strm);
        if (strm.avail_out === 0) {
          s.last_flush = -1; /* avoid BUF_ERROR at next call, see above */
          return Z_OK$2;
        }
      }
    }
    //Assert(strm->avail_out > 0, "bug2");
    //if (strm.avail_out <= 0) { throw new Error("bug2");}

    if (flush !== Z_FINISH$2) {
      return Z_OK$2;
    }
    if (s.wrap <= 0) {
      return Z_STREAM_END$2;
    }

    /* Write the trailer */
    if (s.wrap === 2) {
      put_byte(s, strm.adler & 0xff);
      put_byte(s, (strm.adler >> 8) & 0xff);
      put_byte(s, (strm.adler >> 16) & 0xff);
      put_byte(s, (strm.adler >> 24) & 0xff);
      put_byte(s, strm.total_in & 0xff);
      put_byte(s, (strm.total_in >> 8) & 0xff);
      put_byte(s, (strm.total_in >> 16) & 0xff);
      put_byte(s, (strm.total_in >> 24) & 0xff);
    } else {
      putShortMSB(s, strm.adler >>> 16);
      putShortMSB(s, strm.adler & 0xffff);
    }

    flush_pending(strm);
    /* If avail_out is zero, the application will call deflate again
     * to flush the rest.
     */
    if (s.wrap > 0) {
      s.wrap = -s.wrap;
    }
    /* write the trailer only once! */
    return s.pending !== 0 ? Z_OK$2 : Z_STREAM_END$2;
  }

  function deflateEnd(strm) {
    var status;

    if (!strm /*== Z_NULL*/ || !strm.state /*== Z_NULL*/ ) {
      return Z_STREAM_ERROR$2;
    }

    status = strm.state.status;
    if (status !== INIT_STATE &&
      status !== EXTRA_STATE &&
      status !== NAME_STATE &&
      status !== COMMENT_STATE &&
      status !== HCRC_STATE &&
      status !== BUSY_STATE &&
      status !== FINISH_STATE
    ) {
      return err(strm, Z_STREAM_ERROR$2);
    }

    strm.state = null;

    return status === BUSY_STATE ? err(strm, Z_DATA_ERROR$2) : Z_OK$2;
  }

  /* Not implemented
  exports.deflateBound = deflateBound;
  exports.deflateCopy = deflateCopy;
  exports.deflateParams = deflateParams;
  exports.deflatePending = deflatePending;
  exports.deflatePrime = deflatePrime;
  exports.deflateTune = deflateTune;
  */

  // See state defs from inflate.js
  var BAD$1 = 30;       /* got a data error -- remain here until reset */
  var TYPE$1 = 12;      /* i: waiting for type bits, including last-flag bit */

  /*
     Decode literal, length, and distance codes and write out the resulting
     literal and match bytes until either not enough input or output is
     available, an end-of-block is encountered, or a data error is encountered.
     When large enough input and output buffers are supplied to inflate(), for
     example, a 16K input buffer and a 64K output buffer, more than 95% of the
     inflate execution time is spent in this routine.

     Entry assumptions:

          state.mode === LEN
          strm.avail_in >= 6
          strm.avail_out >= 258
          start >= strm.avail_out
          state.bits < 8

     On return, state.mode is one of:

          LEN -- ran out of enough output space or enough available input
          TYPE -- reached end of block code, inflate() to interpret next block
          BAD -- error in block data

     Notes:

      - The maximum input bits used by a length/distance pair is 15 bits for the
        length code, 5 bits for the length extra, 15 bits for the distance code,
        and 13 bits for the distance extra.  This totals 48 bits, or six bytes.
        Therefore if strm.avail_in >= 6, then there is enough input to avoid
        checking for available input while decoding.

      - The maximum bytes that a single length/distance pair can output is 258
        bytes, which is the maximum length that can be coded.  inflate_fast()
        requires strm.avail_out >= 258 for each loop to avoid checking for
        output space.
   */
  function inflate_fast(strm, start) {
    var state;
    var _in;                    /* local strm.input */
    var last;                   /* have enough input while in < last */
    var _out;                   /* local strm.output */
    var beg;                    /* inflate()'s initial strm.output */
    var end;                    /* while out < end, enough space available */
  //#ifdef INFLATE_STRICT
    var dmax;                   /* maximum distance from zlib header */
  //#endif
    var wsize;                  /* window size or zero if not using window */
    var whave;                  /* valid bytes in the window */
    var wnext;                  /* window write index */
    // Use `s_window` instead `window`, avoid conflict with instrumentation tools
    var s_window;               /* allocated sliding window, if wsize != 0 */
    var hold;                   /* local strm.hold */
    var bits;                   /* local strm.bits */
    var lcode;                  /* local strm.lencode */
    var dcode;                  /* local strm.distcode */
    var lmask;                  /* mask for first level of length codes */
    var dmask;                  /* mask for first level of distance codes */
    var here;                   /* retrieved table entry */
    var op;                     /* code bits, operation, extra bits, or */
                                /*  window position, window bytes to copy */
    var len;                    /* match length, unused bytes */
    var dist;                   /* match distance */
    var from;                   /* where to copy match from */
    var from_source;


    var input, output; // JS specific, because we have no pointers

    /* copy state to local variables */
    state = strm.state;
    //here = state.here;
    _in = strm.next_in;
    input = strm.input;
    last = _in + (strm.avail_in - 5);
    _out = strm.next_out;
    output = strm.output;
    beg = _out - (start - strm.avail_out);
    end = _out + (strm.avail_out - 257);
  //#ifdef INFLATE_STRICT
    dmax = state.dmax;
  //#endif
    wsize = state.wsize;
    whave = state.whave;
    wnext = state.wnext;
    s_window = state.window;
    hold = state.hold;
    bits = state.bits;
    lcode = state.lencode;
    dcode = state.distcode;
    lmask = (1 << state.lenbits) - 1;
    dmask = (1 << state.distbits) - 1;


    /* decode literals and length/distances until end-of-block or not enough
       input data or output space */

    top:
    do {
      if (bits < 15) {
        hold += input[_in++] << bits;
        bits += 8;
        hold += input[_in++] << bits;
        bits += 8;
      }

      here = lcode[hold & lmask];

      dolen:
      for (;;) { // Goto emulation
        op = here >>> 24/*here.bits*/;
        hold >>>= op;
        bits -= op;
        op = (here >>> 16) & 0xff/*here.op*/;
        if (op === 0) {                          /* literal */
          //Tracevv((stderr, here.val >= 0x20 && here.val < 0x7f ?
          //        "inflate:         literal '%c'\n" :
          //        "inflate:         literal 0x%02x\n", here.val));
          output[_out++] = here & 0xffff/*here.val*/;
        }
        else if (op & 16) {                     /* length base */
          len = here & 0xffff/*here.val*/;
          op &= 15;                           /* number of extra bits */
          if (op) {
            if (bits < op) {
              hold += input[_in++] << bits;
              bits += 8;
            }
            len += hold & ((1 << op) - 1);
            hold >>>= op;
            bits -= op;
          }
          //Tracevv((stderr, "inflate:         length %u\n", len));
          if (bits < 15) {
            hold += input[_in++] << bits;
            bits += 8;
            hold += input[_in++] << bits;
            bits += 8;
          }
          here = dcode[hold & dmask];

          dodist:
          for (;;) { // goto emulation
            op = here >>> 24/*here.bits*/;
            hold >>>= op;
            bits -= op;
            op = (here >>> 16) & 0xff/*here.op*/;

            if (op & 16) {                      /* distance base */
              dist = here & 0xffff/*here.val*/;
              op &= 15;                       /* number of extra bits */
              if (bits < op) {
                hold += input[_in++] << bits;
                bits += 8;
                if (bits < op) {
                  hold += input[_in++] << bits;
                  bits += 8;
                }
              }
              dist += hold & ((1 << op) - 1);
  //#ifdef INFLATE_STRICT
              if (dist > dmax) {
                strm.msg = 'invalid distance too far back';
                state.mode = BAD$1;
                break top;
              }
  //#endif
              hold >>>= op;
              bits -= op;
              //Tracevv((stderr, "inflate:         distance %u\n", dist));
              op = _out - beg;                /* max distance in output */
              if (dist > op) {                /* see if copy from window */
                op = dist - op;               /* distance back in window */
                if (op > whave) {
                  if (state.sane) {
                    strm.msg = 'invalid distance too far back';
                    state.mode = BAD$1;
                    break top;
                  }

  // (!) This block is disabled in zlib defailts,
  // don't enable it for binary compatibility
  //#ifdef INFLATE_ALLOW_INVALID_DISTANCE_TOOFAR_ARRR
  //                if (len <= op - whave) {
  //                  do {
  //                    output[_out++] = 0;
  //                  } while (--len);
  //                  continue top;
  //                }
  //                len -= op - whave;
  //                do {
  //                  output[_out++] = 0;
  //                } while (--op > whave);
  //                if (op === 0) {
  //                  from = _out - dist;
  //                  do {
  //                    output[_out++] = output[from++];
  //                  } while (--len);
  //                  continue top;
  //                }
  //#endif
                }
                from = 0; // window index
                from_source = s_window;
                if (wnext === 0) {           /* very common case */
                  from += wsize - op;
                  if (op < len) {         /* some from window */
                    len -= op;
                    do {
                      output[_out++] = s_window[from++];
                    } while (--op);
                    from = _out - dist;  /* rest from output */
                    from_source = output;
                  }
                }
                else if (wnext < op) {      /* wrap around window */
                  from += wsize + wnext - op;
                  op -= wnext;
                  if (op < len) {         /* some from end of window */
                    len -= op;
                    do {
                      output[_out++] = s_window[from++];
                    } while (--op);
                    from = 0;
                    if (wnext < len) {  /* some from start of window */
                      op = wnext;
                      len -= op;
                      do {
                        output[_out++] = s_window[from++];
                      } while (--op);
                      from = _out - dist;      /* rest from output */
                      from_source = output;
                    }
                  }
                }
                else {                      /* contiguous in window */
                  from += wnext - op;
                  if (op < len) {         /* some from window */
                    len -= op;
                    do {
                      output[_out++] = s_window[from++];
                    } while (--op);
                    from = _out - dist;  /* rest from output */
                    from_source = output;
                  }
                }
                while (len > 2) {
                  output[_out++] = from_source[from++];
                  output[_out++] = from_source[from++];
                  output[_out++] = from_source[from++];
                  len -= 3;
                }
                if (len) {
                  output[_out++] = from_source[from++];
                  if (len > 1) {
                    output[_out++] = from_source[from++];
                  }
                }
              }
              else {
                from = _out - dist;          /* copy direct from output */
                do {                        /* minimum length is three */
                  output[_out++] = output[from++];
                  output[_out++] = output[from++];
                  output[_out++] = output[from++];
                  len -= 3;
                } while (len > 2);
                if (len) {
                  output[_out++] = output[from++];
                  if (len > 1) {
                    output[_out++] = output[from++];
                  }
                }
              }
            }
            else if ((op & 64) === 0) {          /* 2nd level distance code */
              here = dcode[(here & 0xffff)/*here.val*/ + (hold & ((1 << op) - 1))];
              continue dodist;
            }
            else {
              strm.msg = 'invalid distance code';
              state.mode = BAD$1;
              break top;
            }

            break; // need to emulate goto via "continue"
          }
        }
        else if ((op & 64) === 0) {              /* 2nd level length code */
          here = lcode[(here & 0xffff)/*here.val*/ + (hold & ((1 << op) - 1))];
          continue dolen;
        }
        else if (op & 32) {                     /* end-of-block */
          //Tracevv((stderr, "inflate:         end of block\n"));
          state.mode = TYPE$1;
          break top;
        }
        else {
          strm.msg = 'invalid literal/length code';
          state.mode = BAD$1;
          break top;
        }

        break; // need to emulate goto via "continue"
      }
    } while (_in < last && _out < end);

    /* return unused bytes (on entry, bits < 8, so in won't go too far back) */
    len = bits >> 3;
    _in -= len;
    bits -= len << 3;
    hold &= (1 << bits) - 1;

    /* update state and return */
    strm.next_in = _in;
    strm.next_out = _out;
    strm.avail_in = (_in < last ? 5 + (last - _in) : 5 - (_in - last));
    strm.avail_out = (_out < end ? 257 + (end - _out) : 257 - (_out - end));
    state.hold = hold;
    state.bits = bits;
    return;
  }

  var MAXBITS = 15;
  var ENOUGH_LENS$1 = 852;
  var ENOUGH_DISTS$1 = 592;
  //var ENOUGH = (ENOUGH_LENS+ENOUGH_DISTS);

  var CODES$1 = 0;
  var LENS$1 = 1;
  var DISTS$1 = 2;

  var lbase = [ /* Length codes 257..285 base */
    3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31,
    35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0
  ];

  var lext = [ /* Length codes 257..285 extra */
    16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18,
    19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78
  ];

  var dbase = [ /* Distance codes 0..29 base */
    1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193,
    257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145,
    8193, 12289, 16385, 24577, 0, 0
  ];

  var dext = [ /* Distance codes 0..29 extra */
    16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22,
    23, 23, 24, 24, 25, 25, 26, 26, 27, 27,
    28, 28, 29, 29, 64, 64
  ];

  function inflate_table(type, lens, lens_index, codes, table, table_index, work, opts) {
    var bits = opts.bits;
    //here = opts.here; /* table entry for duplication */

    var len = 0; /* a code's length in bits */
    var sym = 0; /* index of code symbols */
    var min = 0,
      max = 0; /* minimum and maximum code lengths */
    var root = 0; /* number of index bits for root table */
    var curr = 0; /* number of index bits for current table */
    var drop = 0; /* code bits to drop for sub-table */
    var left = 0; /* number of prefix codes available */
    var used = 0; /* code entries in table used */
    var huff = 0; /* Huffman code */
    var incr; /* for incrementing code, index */
    var fill; /* index for replicating entries */
    var low; /* low bits for current root entry */
    var mask; /* mask for low root bits */
    var next; /* next available space in table */
    var base = null; /* base value table to use */
    var base_index = 0;
    //  var shoextra;    /* extra bits table to use */
    var end; /* use base and extra for symbol > end */
    var count = new Buf16(MAXBITS + 1); //[MAXBITS+1];    /* number of codes of each length */
    var offs = new Buf16(MAXBITS + 1); //[MAXBITS+1];     /* offsets in table for each length */
    var extra = null;
    var extra_index = 0;

    var here_bits, here_op, here_val;

    /*
     Process a set of code lengths to create a canonical Huffman code.  The
     code lengths are lens[0..codes-1].  Each length corresponds to the
     symbols 0..codes-1.  The Huffman code is generated by first sorting the
     symbols by length from short to long, and retaining the symbol order
     for codes with equal lengths.  Then the code starts with all zero bits
     for the first code of the shortest length, and the codes are integer
     increments for the same length, and zeros are appended as the length
     increases.  For the deflate format, these bits are stored backwards
     from their more natural integer increment ordering, and so when the
     decoding tables are built in the large loop below, the integer codes
     are incremented backwards.

     This routine assumes, but does not check, that all of the entries in
     lens[] are in the range 0..MAXBITS.  The caller must assure this.
     1..MAXBITS is interpreted as that code length.  zero means that that
     symbol does not occur in this code.

     The codes are sorted by computing a count of codes for each length,
     creating from that a table of starting indices for each length in the
     sorted table, and then entering the symbols in order in the sorted
     table.  The sorted table is work[], with that space being provided by
     the caller.

     The length counts are used for other purposes as well, i.e. finding
     the minimum and maximum length codes, determining if there are any
     codes at all, checking for a valid set of lengths, and looking ahead
     at length counts to determine sub-table sizes when building the
     decoding tables.
     */

    /* accumulate lengths for codes (assumes lens[] all in 0..MAXBITS) */
    for (len = 0; len <= MAXBITS; len++) {
      count[len] = 0;
    }
    for (sym = 0; sym < codes; sym++) {
      count[lens[lens_index + sym]]++;
    }

    /* bound code lengths, force root to be within code lengths */
    root = bits;
    for (max = MAXBITS; max >= 1; max--) {
      if (count[max] !== 0) {
        break;
      }
    }
    if (root > max) {
      root = max;
    }
    if (max === 0) { /* no symbols to code at all */
      //table.op[opts.table_index] = 64;  //here.op = (var char)64;    /* invalid code marker */
      //table.bits[opts.table_index] = 1;   //here.bits = (var char)1;
      //table.val[opts.table_index++] = 0;   //here.val = (var short)0;
      table[table_index++] = (1 << 24) | (64 << 16) | 0;


      //table.op[opts.table_index] = 64;
      //table.bits[opts.table_index] = 1;
      //table.val[opts.table_index++] = 0;
      table[table_index++] = (1 << 24) | (64 << 16) | 0;

      opts.bits = 1;
      return 0; /* no symbols, but wait for decoding to report error */
    }
    for (min = 1; min < max; min++) {
      if (count[min] !== 0) {
        break;
      }
    }
    if (root < min) {
      root = min;
    }

    /* check for an over-subscribed or incomplete set of lengths */
    left = 1;
    for (len = 1; len <= MAXBITS; len++) {
      left <<= 1;
      left -= count[len];
      if (left < 0) {
        return -1;
      } /* over-subscribed */
    }
    if (left > 0 && (type === CODES$1 || max !== 1)) {
      return -1; /* incomplete set */
    }

    /* generate offsets into symbol table for each length for sorting */
    offs[1] = 0;
    for (len = 1; len < MAXBITS; len++) {
      offs[len + 1] = offs[len] + count[len];
    }

    /* sort symbols by length, by symbol order within each length */
    for (sym = 0; sym < codes; sym++) {
      if (lens[lens_index + sym] !== 0) {
        work[offs[lens[lens_index + sym]]++] = sym;
      }
    }

    /*
     Create and fill in decoding tables.  In this loop, the table being
     filled is at next and has curr index bits.  The code being used is huff
     with length len.  That code is converted to an index by dropping drop
     bits off of the bottom.  For codes where len is less than drop + curr,
     those top drop + curr - len bits are incremented through all values to
     fill the table with replicated entries.

     root is the number of index bits for the root table.  When len exceeds
     root, sub-tables are created pointed to by the root entry with an index
     of the low root bits of huff.  This is saved in low to check for when a
     new sub-table should be started.  drop is zero when the root table is
     being filled, and drop is root when sub-tables are being filled.

     When a new sub-table is needed, it is necessary to look ahead in the
     code lengths to determine what size sub-table is needed.  The length
     counts are used for this, and so count[] is decremented as codes are
     entered in the tables.

     used keeps track of how many table entries have been allocated from the
     provided *table space.  It is checked for LENS and DIST tables against
     the constants ENOUGH_LENS and ENOUGH_DISTS to guard against changes in
     the initial root table size constants.  See the comments in inftrees.h
     for more information.

     sym increments through all symbols, and the loop terminates when
     all codes of length max, i.e. all codes, have been processed.  This
     routine permits incomplete codes, so another loop after this one fills
     in the rest of the decoding tables with invalid code markers.
     */

    /* set up for code type */
    // poor man optimization - use if-else instead of switch,
    // to avoid deopts in old v8
    if (type === CODES$1) {
      base = extra = work; /* dummy value--not used */
      end = 19;

    } else if (type === LENS$1) {
      base = lbase;
      base_index -= 257;
      extra = lext;
      extra_index -= 257;
      end = 256;

    } else { /* DISTS */
      base = dbase;
      extra = dext;
      end = -1;
    }

    /* initialize opts for loop */
    huff = 0; /* starting code */
    sym = 0; /* starting code symbol */
    len = min; /* starting code length */
    next = table_index; /* current table to fill in */
    curr = root; /* current table index bits */
    drop = 0; /* current bits to drop from code for index */
    low = -1; /* trigger new sub-table when len > root */
    used = 1 << root; /* use root table entries */
    mask = used - 1; /* mask for comparing low */

    /* check available table space */
    if ((type === LENS$1 && used > ENOUGH_LENS$1) ||
      (type === DISTS$1 && used > ENOUGH_DISTS$1)) {
      return 1;
    }
    /* process all codes and make table entries */
    for (;;) {
      /* create table entry */
      here_bits = len - drop;
      if (work[sym] < end) {
        here_op = 0;
        here_val = work[sym];
      } else if (work[sym] > end) {
        here_op = extra[extra_index + work[sym]];
        here_val = base[base_index + work[sym]];
      } else {
        here_op = 32 + 64; /* end of block */
        here_val = 0;
      }

      /* replicate for those indices with low len bits equal to huff */
      incr = 1 << (len - drop);
      fill = 1 << curr;
      min = fill; /* save offset to next table */
      do {
        fill -= incr;
        table[next + (huff >> drop) + fill] = (here_bits << 24) | (here_op << 16) | here_val | 0;
      } while (fill !== 0);

      /* backwards increment the len-bit code huff */
      incr = 1 << (len - 1);
      while (huff & incr) {
        incr >>= 1;
      }
      if (incr !== 0) {
        huff &= incr - 1;
        huff += incr;
      } else {
        huff = 0;
      }

      /* go to next symbol, update count, len */
      sym++;
      if (--count[len] === 0) {
        if (len === max) {
          break;
        }
        len = lens[lens_index + work[sym]];
      }

      /* create new sub-table if needed */
      if (len > root && (huff & mask) !== low) {
        /* if first time, transition to sub-tables */
        if (drop === 0) {
          drop = root;
        }

        /* increment past last table */
        next += min; /* here min is 1 << curr */

        /* determine length of next table */
        curr = len - drop;
        left = 1 << curr;
        while (curr + drop < max) {
          left -= count[curr + drop];
          if (left <= 0) {
            break;
          }
          curr++;
          left <<= 1;
        }

        /* check for enough space */
        used += 1 << curr;
        if ((type === LENS$1 && used > ENOUGH_LENS$1) ||
          (type === DISTS$1 && used > ENOUGH_DISTS$1)) {
          return 1;
        }

        /* point entry in root table to sub-table */
        low = huff & mask;
        /*table.op[low] = curr;
        table.bits[low] = root;
        table.val[low] = next - opts.table_index;*/
        table[low] = (root << 24) | (curr << 16) | (next - table_index) | 0;
      }
    }

    /* fill in remaining table entry if code is incomplete (guaranteed to have
     at most one remaining entry, since if the code is incomplete, the
     maximum code length that was allowed to get this far is one bit) */
    if (huff !== 0) {
      //table.op[next + huff] = 64;            /* invalid code marker */
      //table.bits[next + huff] = len - drop;
      //table.val[next + huff] = 0;
      table[next + huff] = ((len - drop) << 24) | (64 << 16) | 0;
    }

    /* set return parameters */
    //opts.table_index += used;
    opts.bits = root;
    return 0;
  }

  var CODES = 0;
  var LENS = 1;
  var DISTS = 2;

  /* Public constants ==========================================================*/
  /* ===========================================================================*/


  /* Allowed flush values; see deflate() and inflate() below for details */
  //var Z_NO_FLUSH      = 0;
  //var Z_PARTIAL_FLUSH = 1;
  //var Z_SYNC_FLUSH    = 2;
  //var Z_FULL_FLUSH    = 3;
  var Z_FINISH$1 = 4;
  var Z_BLOCK$1 = 5;
  var Z_TREES$1 = 6;


  /* Return codes for the compression/decompression functions. Negative values
   * are errors, positive values are used for special but normal events.
   */
  var Z_OK$1 = 0;
  var Z_STREAM_END$1 = 1;
  var Z_NEED_DICT$1 = 2;
  //var Z_ERRNO         = -1;
  var Z_STREAM_ERROR$1 = -2;
  var Z_DATA_ERROR$1 = -3;
  var Z_MEM_ERROR = -4;
  var Z_BUF_ERROR$1 = -5;
  //var Z_VERSION_ERROR = -6;

  /* The deflate compression method */
  var Z_DEFLATED$1 = 8;


  /* STATES ====================================================================*/
  /* ===========================================================================*/


  var HEAD = 1; /* i: waiting for magic header */
  var FLAGS = 2; /* i: waiting for method and flags (gzip) */
  var TIME = 3; /* i: waiting for modification time (gzip) */
  var OS = 4; /* i: waiting for extra flags and operating system (gzip) */
  var EXLEN = 5; /* i: waiting for extra length (gzip) */
  var EXTRA = 6; /* i: waiting for extra bytes (gzip) */
  var NAME = 7; /* i: waiting for end of file name (gzip) */
  var COMMENT = 8; /* i: waiting for end of comment (gzip) */
  var HCRC = 9; /* i: waiting for header crc (gzip) */
  var DICTID = 10; /* i: waiting for dictionary check value */
  var DICT = 11; /* waiting for inflateSetDictionary() call */
  var TYPE = 12; /* i: waiting for type bits, including last-flag bit */
  var TYPEDO = 13; /* i: same, but skip check to exit inflate on new block */
  var STORED = 14; /* i: waiting for stored size (length and complement) */
  var COPY_ = 15; /* i/o: same as COPY below, but only first time in */
  var COPY = 16; /* i/o: waiting for input or output to copy stored block */
  var TABLE = 17; /* i: waiting for dynamic block table lengths */
  var LENLENS = 18; /* i: waiting for code length code lengths */
  var CODELENS = 19; /* i: waiting for length/lit and distance code lengths */
  var LEN_ = 20; /* i: same as LEN below, but only first time in */
  var LEN = 21; /* i: waiting for length/lit/eob code */
  var LENEXT = 22; /* i: waiting for length extra bits */
  var DIST = 23; /* i: waiting for distance code */
  var DISTEXT = 24; /* i: waiting for distance extra bits */
  var MATCH = 25; /* o: waiting for output space to copy string */
  var LIT = 26; /* o: waiting for output space to write literal */
  var CHECK = 27; /* i: waiting for 32-bit check value */
  var LENGTH = 28; /* i: waiting for 32-bit length (gzip) */
  var DONE = 29; /* finished check, done -- remain here until reset */
  var BAD = 30; /* got a data error -- remain here until reset */
  var MEM = 31; /* got an inflate() memory error -- remain here until reset */
  var SYNC = 32; /* looking for synchronization bytes to restart inflate() */

  /* ===========================================================================*/



  var ENOUGH_LENS = 852;
  var ENOUGH_DISTS = 592;


  function zswap32(q) {
    return (((q >>> 24) & 0xff) +
      ((q >>> 8) & 0xff00) +
      ((q & 0xff00) << 8) +
      ((q & 0xff) << 24));
  }


  function InflateState() {
    this.mode = 0; /* current inflate mode */
    this.last = false; /* true if processing last block */
    this.wrap = 0; /* bit 0 true for zlib, bit 1 true for gzip */
    this.havedict = false; /* true if dictionary provided */
    this.flags = 0; /* gzip header method and flags (0 if zlib) */
    this.dmax = 0; /* zlib header max distance (INFLATE_STRICT) */
    this.check = 0; /* protected copy of check value */
    this.total = 0; /* protected copy of output count */
    // TODO: may be {}
    this.head = null; /* where to save gzip header information */

    /* sliding window */
    this.wbits = 0; /* log base 2 of requested window size */
    this.wsize = 0; /* window size or zero if not using window */
    this.whave = 0; /* valid bytes in the window */
    this.wnext = 0; /* window write index */
    this.window = null; /* allocated sliding window, if needed */

    /* bit accumulator */
    this.hold = 0; /* input bit accumulator */
    this.bits = 0; /* number of bits in "in" */

    /* for string and stored block copying */
    this.length = 0; /* literal or length of data to copy */
    this.offset = 0; /* distance back to copy string from */

    /* for table and code decoding */
    this.extra = 0; /* extra bits needed */

    /* fixed and dynamic code tables */
    this.lencode = null; /* starting table for length/literal codes */
    this.distcode = null; /* starting table for distance codes */
    this.lenbits = 0; /* index bits for lencode */
    this.distbits = 0; /* index bits for distcode */

    /* dynamic table building */
    this.ncode = 0; /* number of code length code lengths */
    this.nlen = 0; /* number of length code lengths */
    this.ndist = 0; /* number of distance code lengths */
    this.have = 0; /* number of code lengths in lens[] */
    this.next = null; /* next available space in codes[] */

    this.lens = new Buf16(320); /* temporary storage for code lengths */
    this.work = new Buf16(288); /* work area for code table building */

    /*
     because we don't have pointers in js, we use lencode and distcode directly
     as buffers so we don't need codes
    */
    //this.codes = new Buf32(ENOUGH);       /* space for code tables */
    this.lendyn = null; /* dynamic table for length/literal codes (JS specific) */
    this.distdyn = null; /* dynamic table for distance codes (JS specific) */
    this.sane = 0; /* if false, allow invalid distance too far */
    this.back = 0; /* bits back of last unprocessed length/lit */
    this.was = 0; /* initial length of match */
  }

  function inflateResetKeep(strm) {
    var state;

    if (!strm || !strm.state) {
      return Z_STREAM_ERROR$1;
    }
    state = strm.state;
    strm.total_in = strm.total_out = state.total = 0;
    strm.msg = ''; /*Z_NULL*/
    if (state.wrap) { /* to support ill-conceived Java test suite */
      strm.adler = state.wrap & 1;
    }
    state.mode = HEAD;
    state.last = 0;
    state.havedict = 0;
    state.dmax = 32768;
    state.head = null /*Z_NULL*/ ;
    state.hold = 0;
    state.bits = 0;
    //state.lencode = state.distcode = state.next = state.codes;
    state.lencode = state.lendyn = new Buf32(ENOUGH_LENS);
    state.distcode = state.distdyn = new Buf32(ENOUGH_DISTS);

    state.sane = 1;
    state.back = -1;
    //Tracev((stderr, "inflate: reset\n"));
    return Z_OK$1;
  }

  function inflateReset(strm) {
    var state;

    if (!strm || !strm.state) {
      return Z_STREAM_ERROR$1;
    }
    state = strm.state;
    state.wsize = 0;
    state.whave = 0;
    state.wnext = 0;
    return inflateResetKeep(strm);

  }

  function inflateReset2(strm, windowBits) {
    var wrap;
    var state;

    /* get the state */
    if (!strm || !strm.state) {
      return Z_STREAM_ERROR$1;
    }
    state = strm.state;

    /* extract wrap request from windowBits parameter */
    if (windowBits < 0) {
      wrap = 0;
      windowBits = -windowBits;
    } else {
      wrap = (windowBits >> 4) + 1;
      if (windowBits < 48) {
        windowBits &= 15;
      }
    }

    /* set number of window bits, free window if different */
    if (windowBits && (windowBits < 8 || windowBits > 15)) {
      return Z_STREAM_ERROR$1;
    }
    if (state.window !== null && state.wbits !== windowBits) {
      state.window = null;
    }

    /* update state and reset the rest of it */
    state.wrap = wrap;
    state.wbits = windowBits;
    return inflateReset(strm);
  }

  function inflateInit2(strm, windowBits) {
    var ret;
    var state;

    if (!strm) {
      return Z_STREAM_ERROR$1;
    }
    //strm.msg = Z_NULL;                 /* in case we return an error */

    state = new InflateState();

    //if (state === Z_NULL) return Z_MEM_ERROR;
    //Tracev((stderr, "inflate: allocated\n"));
    strm.state = state;
    state.window = null /*Z_NULL*/ ;
    ret = inflateReset2(strm, windowBits);
    if (ret !== Z_OK$1) {
      strm.state = null /*Z_NULL*/ ;
    }
    return ret;
  }


  /*
   Return state with length and distance decoding tables and index sizes set to
   fixed code decoding.  Normally this returns fixed tables from inffixed.h.
   If BUILDFIXED is defined, then instead this routine builds the tables the
   first time it's called, and returns those tables the first time and
   thereafter.  This reduces the size of the code by about 2K bytes, in
   exchange for a little execution time.  However, BUILDFIXED should not be
   used for threaded applications, since the rewriting of the tables and virgin
   may not be thread-safe.
   */
  var virgin = true;

  var lenfix, distfix; // We have no pointers in JS, so keep tables separate

  function fixedtables(state) {
    /* build fixed huffman tables if first call (may not be thread safe) */
    if (virgin) {
      var sym;

      lenfix = new Buf32(512);
      distfix = new Buf32(32);

      /* literal/length table */
      sym = 0;
      while (sym < 144) {
        state.lens[sym++] = 8;
      }
      while (sym < 256) {
        state.lens[sym++] = 9;
      }
      while (sym < 280) {
        state.lens[sym++] = 7;
      }
      while (sym < 288) {
        state.lens[sym++] = 8;
      }

      inflate_table(LENS, state.lens, 0, 288, lenfix, 0, state.work, {
        bits: 9
      });

      /* distance table */
      sym = 0;
      while (sym < 32) {
        state.lens[sym++] = 5;
      }

      inflate_table(DISTS, state.lens, 0, 32, distfix, 0, state.work, {
        bits: 5
      });

      /* do this just once */
      virgin = false;
    }

    state.lencode = lenfix;
    state.lenbits = 9;
    state.distcode = distfix;
    state.distbits = 5;
  }


  /*
   Update the window with the last wsize (normally 32K) bytes written before
   returning.  If window does not exist yet, create it.  This is only called
   when a window is already in use, or when output has been written during this
   inflate call, but the end of the deflate stream has not been reached yet.
   It is also called to create a window for dictionary data when a dictionary
   is loaded.

   Providing output buffers larger than 32K to inflate() should provide a speed
   advantage, since only the last 32K of output is copied to the sliding window
   upon return from inflate(), and since all distances after the first 32K of
   output will fall in the output data, making match copies simpler and faster.
   The advantage may be dependent on the size of the processor's data caches.
   */
  function updatewindow(strm, src, end, copy) {
    var dist;
    var state = strm.state;

    /* if it hasn't been done already, allocate space for the window */
    if (state.window === null) {
      state.wsize = 1 << state.wbits;
      state.wnext = 0;
      state.whave = 0;

      state.window = new Buf8(state.wsize);
    }

    /* copy state->wsize or less output bytes into the circular window */
    if (copy >= state.wsize) {
      arraySet(state.window, src, end - state.wsize, state.wsize, 0);
      state.wnext = 0;
      state.whave = state.wsize;
    } else {
      dist = state.wsize - state.wnext;
      if (dist > copy) {
        dist = copy;
      }
      //zmemcpy(state->window + state->wnext, end - copy, dist);
      arraySet(state.window, src, end - copy, dist, state.wnext);
      copy -= dist;
      if (copy) {
        //zmemcpy(state->window, end - copy, copy);
        arraySet(state.window, src, end - copy, copy, 0);
        state.wnext = copy;
        state.whave = state.wsize;
      } else {
        state.wnext += dist;
        if (state.wnext === state.wsize) {
          state.wnext = 0;
        }
        if (state.whave < state.wsize) {
          state.whave += dist;
        }
      }
    }
    return 0;
  }

  function inflate$1(strm, flush) {
    var state;
    var input, output; // input/output buffers
    var next; /* next input INDEX */
    var put; /* next output INDEX */
    var have, left; /* available input and output */
    var hold; /* bit buffer */
    var bits; /* bits in bit buffer */
    var _in, _out; /* save starting available input and output */
    var copy; /* number of stored or match bytes to copy */
    var from; /* where to copy match bytes from */
    var from_source;
    var here = 0; /* current decoding table entry */
    var here_bits, here_op, here_val; // paked "here" denormalized (JS specific)
    //var last;                   /* parent table entry */
    var last_bits, last_op, last_val; // paked "last" denormalized (JS specific)
    var len; /* length to copy for repeats, bits to drop */
    var ret; /* return code */
    var hbuf = new Buf8(4); /* buffer for gzip header crc calculation */
    var opts;

    var n; // temporary var for NEED_BITS

    var order = /* permutation of code lengths */ [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];


    if (!strm || !strm.state || !strm.output ||
      (!strm.input && strm.avail_in !== 0)) {
      return Z_STREAM_ERROR$1;
    }

    state = strm.state;
    if (state.mode === TYPE) {
      state.mode = TYPEDO;
    } /* skip check */


    //--- LOAD() ---
    put = strm.next_out;
    output = strm.output;
    left = strm.avail_out;
    next = strm.next_in;
    input = strm.input;
    have = strm.avail_in;
    hold = state.hold;
    bits = state.bits;
    //---

    _in = have;
    _out = left;
    ret = Z_OK$1;

    inf_leave: // goto emulation
      for (;;) {
        switch (state.mode) {
        case HEAD:
          if (state.wrap === 0) {
            state.mode = TYPEDO;
            break;
          }
          //=== NEEDBITS(16);
          while (bits < 16) {
            if (have === 0) {
              break inf_leave;
            }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          //===//
          if ((state.wrap & 2) && hold === 0x8b1f) { /* gzip header */
            state.check = 0 /*crc32(0L, Z_NULL, 0)*/ ;
            //=== CRC2(state.check, hold);
            hbuf[0] = hold & 0xff;
            hbuf[1] = (hold >>> 8) & 0xff;
            state.check = crc32(state.check, hbuf, 2, 0);
            //===//

            //=== INITBITS();
            hold = 0;
            bits = 0;
            //===//
            state.mode = FLAGS;
            break;
          }
          state.flags = 0; /* expect zlib header */
          if (state.head) {
            state.head.done = false;
          }
          if (!(state.wrap & 1) || /* check if zlib header allowed */
            (((hold & 0xff) /*BITS(8)*/ << 8) + (hold >> 8)) % 31) {
            strm.msg = 'incorrect header check';
            state.mode = BAD;
            break;
          }
          if ((hold & 0x0f) /*BITS(4)*/ !== Z_DEFLATED$1) {
            strm.msg = 'unknown compression method';
            state.mode = BAD;
            break;
          }
          //--- DROPBITS(4) ---//
          hold >>>= 4;
          bits -= 4;
          //---//
          len = (hold & 0x0f) /*BITS(4)*/ + 8;
          if (state.wbits === 0) {
            state.wbits = len;
          } else if (len > state.wbits) {
            strm.msg = 'invalid window size';
            state.mode = BAD;
            break;
          }
          state.dmax = 1 << len;
          //Tracev((stderr, "inflate:   zlib header ok\n"));
          strm.adler = state.check = 1 /*adler32(0L, Z_NULL, 0)*/ ;
          state.mode = hold & 0x200 ? DICTID : TYPE;
          //=== INITBITS();
          hold = 0;
          bits = 0;
          //===//
          break;
        case FLAGS:
          //=== NEEDBITS(16); */
          while (bits < 16) {
            if (have === 0) {
              break inf_leave;
            }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          //===//
          state.flags = hold;
          if ((state.flags & 0xff) !== Z_DEFLATED$1) {
            strm.msg = 'unknown compression method';
            state.mode = BAD;
            break;
          }
          if (state.flags & 0xe000) {
            strm.msg = 'unknown header flags set';
            state.mode = BAD;
            break;
          }
          if (state.head) {
            state.head.text = ((hold >> 8) & 1);
          }
          if (state.flags & 0x0200) {
            //=== CRC2(state.check, hold);
            hbuf[0] = hold & 0xff;
            hbuf[1] = (hold >>> 8) & 0xff;
            state.check = crc32(state.check, hbuf, 2, 0);
            //===//
          }
          //=== INITBITS();
          hold = 0;
          bits = 0;
          //===//
          state.mode = TIME;
          /* falls through */
        case TIME:
          //=== NEEDBITS(32); */
          while (bits < 32) {
            if (have === 0) {
              break inf_leave;
            }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          //===//
          if (state.head) {
            state.head.time = hold;
          }
          if (state.flags & 0x0200) {
            //=== CRC4(state.check, hold)
            hbuf[0] = hold & 0xff;
            hbuf[1] = (hold >>> 8) & 0xff;
            hbuf[2] = (hold >>> 16) & 0xff;
            hbuf[3] = (hold >>> 24) & 0xff;
            state.check = crc32(state.check, hbuf, 4, 0);
            //===
          }
          //=== INITBITS();
          hold = 0;
          bits = 0;
          //===//
          state.mode = OS;
          /* falls through */
        case OS:
          //=== NEEDBITS(16); */
          while (bits < 16) {
            if (have === 0) {
              break inf_leave;
            }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          //===//
          if (state.head) {
            state.head.xflags = (hold & 0xff);
            state.head.os = (hold >> 8);
          }
          if (state.flags & 0x0200) {
            //=== CRC2(state.check, hold);
            hbuf[0] = hold & 0xff;
            hbuf[1] = (hold >>> 8) & 0xff;
            state.check = crc32(state.check, hbuf, 2, 0);
            //===//
          }
          //=== INITBITS();
          hold = 0;
          bits = 0;
          //===//
          state.mode = EXLEN;
          /* falls through */
        case EXLEN:
          if (state.flags & 0x0400) {
            //=== NEEDBITS(16); */
            while (bits < 16) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            //===//
            state.length = hold;
            if (state.head) {
              state.head.extra_len = hold;
            }
            if (state.flags & 0x0200) {
              //=== CRC2(state.check, hold);
              hbuf[0] = hold & 0xff;
              hbuf[1] = (hold >>> 8) & 0xff;
              state.check = crc32(state.check, hbuf, 2, 0);
              //===//
            }
            //=== INITBITS();
            hold = 0;
            bits = 0;
            //===//
          } else if (state.head) {
            state.head.extra = null /*Z_NULL*/ ;
          }
          state.mode = EXTRA;
          /* falls through */
        case EXTRA:
          if (state.flags & 0x0400) {
            copy = state.length;
            if (copy > have) {
              copy = have;
            }
            if (copy) {
              if (state.head) {
                len = state.head.extra_len - state.length;
                if (!state.head.extra) {
                  // Use untyped array for more conveniend processing later
                  state.head.extra = new Array(state.head.extra_len);
                }
                arraySet(
                  state.head.extra,
                  input,
                  next,
                  // extra field is limited to 65536 bytes
                  // - no need for additional size check
                  copy,
                  /*len + copy > state.head.extra_max - len ? state.head.extra_max : copy,*/
                  len
                );
                //zmemcpy(state.head.extra + len, next,
                //        len + copy > state.head.extra_max ?
                //        state.head.extra_max - len : copy);
              }
              if (state.flags & 0x0200) {
                state.check = crc32(state.check, input, copy, next);
              }
              have -= copy;
              next += copy;
              state.length -= copy;
            }
            if (state.length) {
              break inf_leave;
            }
          }
          state.length = 0;
          state.mode = NAME;
          /* falls through */
        case NAME:
          if (state.flags & 0x0800) {
            if (have === 0) {
              break inf_leave;
            }
            copy = 0;
            do {
              // TODO: 2 or 1 bytes?
              len = input[next + copy++];
              /* use constant limit because in js we should not preallocate memory */
              if (state.head && len &&
                (state.length < 65536 /*state.head.name_max*/ )) {
                state.head.name += String.fromCharCode(len);
              }
            } while (len && copy < have);

            if (state.flags & 0x0200) {
              state.check = crc32(state.check, input, copy, next);
            }
            have -= copy;
            next += copy;
            if (len) {
              break inf_leave;
            }
          } else if (state.head) {
            state.head.name = null;
          }
          state.length = 0;
          state.mode = COMMENT;
          /* falls through */
        case COMMENT:
          if (state.flags & 0x1000) {
            if (have === 0) {
              break inf_leave;
            }
            copy = 0;
            do {
              len = input[next + copy++];
              /* use constant limit because in js we should not preallocate memory */
              if (state.head && len &&
                (state.length < 65536 /*state.head.comm_max*/ )) {
                state.head.comment += String.fromCharCode(len);
              }
            } while (len && copy < have);
            if (state.flags & 0x0200) {
              state.check = crc32(state.check, input, copy, next);
            }
            have -= copy;
            next += copy;
            if (len) {
              break inf_leave;
            }
          } else if (state.head) {
            state.head.comment = null;
          }
          state.mode = HCRC;
          /* falls through */
        case HCRC:
          if (state.flags & 0x0200) {
            //=== NEEDBITS(16); */
            while (bits < 16) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            //===//
            if (hold !== (state.check & 0xffff)) {
              strm.msg = 'header crc mismatch';
              state.mode = BAD;
              break;
            }
            //=== INITBITS();
            hold = 0;
            bits = 0;
            //===//
          }
          if (state.head) {
            state.head.hcrc = ((state.flags >> 9) & 1);
            state.head.done = true;
          }
          strm.adler = state.check = 0;
          state.mode = TYPE;
          break;
        case DICTID:
          //=== NEEDBITS(32); */
          while (bits < 32) {
            if (have === 0) {
              break inf_leave;
            }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          //===//
          strm.adler = state.check = zswap32(hold);
          //=== INITBITS();
          hold = 0;
          bits = 0;
          //===//
          state.mode = DICT;
          /* falls through */
        case DICT:
          if (state.havedict === 0) {
            //--- RESTORE() ---
            strm.next_out = put;
            strm.avail_out = left;
            strm.next_in = next;
            strm.avail_in = have;
            state.hold = hold;
            state.bits = bits;
            //---
            return Z_NEED_DICT$1;
          }
          strm.adler = state.check = 1 /*adler32(0L, Z_NULL, 0)*/ ;
          state.mode = TYPE;
          /* falls through */
        case TYPE:
          if (flush === Z_BLOCK$1 || flush === Z_TREES$1) {
            break inf_leave;
          }
          /* falls through */
        case TYPEDO:
          if (state.last) {
            //--- BYTEBITS() ---//
            hold >>>= bits & 7;
            bits -= bits & 7;
            //---//
            state.mode = CHECK;
            break;
          }
          //=== NEEDBITS(3); */
          while (bits < 3) {
            if (have === 0) {
              break inf_leave;
            }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          //===//
          state.last = (hold & 0x01) /*BITS(1)*/ ;
          //--- DROPBITS(1) ---//
          hold >>>= 1;
          bits -= 1;
          //---//

          switch ((hold & 0x03) /*BITS(2)*/ ) {
          case 0:
            /* stored block */
            //Tracev((stderr, "inflate:     stored block%s\n",
            //        state.last ? " (last)" : ""));
            state.mode = STORED;
            break;
          case 1:
            /* fixed block */
            fixedtables(state);
            //Tracev((stderr, "inflate:     fixed codes block%s\n",
            //        state.last ? " (last)" : ""));
            state.mode = LEN_; /* decode codes */
            if (flush === Z_TREES$1) {
              //--- DROPBITS(2) ---//
              hold >>>= 2;
              bits -= 2;
              //---//
              break inf_leave;
            }
            break;
          case 2:
            /* dynamic block */
            //Tracev((stderr, "inflate:     dynamic codes block%s\n",
            //        state.last ? " (last)" : ""));
            state.mode = TABLE;
            break;
          case 3:
            strm.msg = 'invalid block type';
            state.mode = BAD;
          }
          //--- DROPBITS(2) ---//
          hold >>>= 2;
          bits -= 2;
          //---//
          break;
        case STORED:
          //--- BYTEBITS() ---// /* go to byte boundary */
          hold >>>= bits & 7;
          bits -= bits & 7;
          //---//
          //=== NEEDBITS(32); */
          while (bits < 32) {
            if (have === 0) {
              break inf_leave;
            }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          //===//
          if ((hold & 0xffff) !== ((hold >>> 16) ^ 0xffff)) {
            strm.msg = 'invalid stored block lengths';
            state.mode = BAD;
            break;
          }
          state.length = hold & 0xffff;
          //Tracev((stderr, "inflate:       stored length %u\n",
          //        state.length));
          //=== INITBITS();
          hold = 0;
          bits = 0;
          //===//
          state.mode = COPY_;
          if (flush === Z_TREES$1) {
            break inf_leave;
          }
          /* falls through */
        case COPY_:
          state.mode = COPY;
          /* falls through */
        case COPY:
          copy = state.length;
          if (copy) {
            if (copy > have) {
              copy = have;
            }
            if (copy > left) {
              copy = left;
            }
            if (copy === 0) {
              break inf_leave;
            }
            //--- zmemcpy(put, next, copy); ---
            arraySet(output, input, next, copy, put);
            //---//
            have -= copy;
            next += copy;
            left -= copy;
            put += copy;
            state.length -= copy;
            break;
          }
          //Tracev((stderr, "inflate:       stored end\n"));
          state.mode = TYPE;
          break;
        case TABLE:
          //=== NEEDBITS(14); */
          while (bits < 14) {
            if (have === 0) {
              break inf_leave;
            }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          //===//
          state.nlen = (hold & 0x1f) /*BITS(5)*/ + 257;
          //--- DROPBITS(5) ---//
          hold >>>= 5;
          bits -= 5;
          //---//
          state.ndist = (hold & 0x1f) /*BITS(5)*/ + 1;
          //--- DROPBITS(5) ---//
          hold >>>= 5;
          bits -= 5;
          //---//
          state.ncode = (hold & 0x0f) /*BITS(4)*/ + 4;
          //--- DROPBITS(4) ---//
          hold >>>= 4;
          bits -= 4;
          //---//
          //#ifndef PKZIP_BUG_WORKAROUND
          if (state.nlen > 286 || state.ndist > 30) {
            strm.msg = 'too many length or distance symbols';
            state.mode = BAD;
            break;
          }
          //#endif
          //Tracev((stderr, "inflate:       table sizes ok\n"));
          state.have = 0;
          state.mode = LENLENS;
          /* falls through */
        case LENLENS:
          while (state.have < state.ncode) {
            //=== NEEDBITS(3);
            while (bits < 3) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            //===//
            state.lens[order[state.have++]] = (hold & 0x07); //BITS(3);
            //--- DROPBITS(3) ---//
            hold >>>= 3;
            bits -= 3;
            //---//
          }
          while (state.have < 19) {
            state.lens[order[state.have++]] = 0;
          }
          // We have separate tables & no pointers. 2 commented lines below not needed.
          //state.next = state.codes;
          //state.lencode = state.next;
          // Switch to use dynamic table
          state.lencode = state.lendyn;
          state.lenbits = 7;

          opts = {
            bits: state.lenbits
          };
          ret = inflate_table(CODES, state.lens, 0, 19, state.lencode, 0, state.work, opts);
          state.lenbits = opts.bits;

          if (ret) {
            strm.msg = 'invalid code lengths set';
            state.mode = BAD;
            break;
          }
          //Tracev((stderr, "inflate:       code lengths ok\n"));
          state.have = 0;
          state.mode = CODELENS;
          /* falls through */
        case CODELENS:
          while (state.have < state.nlen + state.ndist) {
            for (;;) {
              here = state.lencode[hold & ((1 << state.lenbits) - 1)]; /*BITS(state.lenbits)*/
              here_bits = here >>> 24;
              here_op = (here >>> 16) & 0xff;
              here_val = here & 0xffff;

              if ((here_bits) <= bits) {
                break;
              }
              //--- PULLBYTE() ---//
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
              //---//
            }
            if (here_val < 16) {
              //--- DROPBITS(here.bits) ---//
              hold >>>= here_bits;
              bits -= here_bits;
              //---//
              state.lens[state.have++] = here_val;
            } else {
              if (here_val === 16) {
                //=== NEEDBITS(here.bits + 2);
                n = here_bits + 2;
                while (bits < n) {
                  if (have === 0) {
                    break inf_leave;
                  }
                  have--;
                  hold += input[next++] << bits;
                  bits += 8;
                }
                //===//
                //--- DROPBITS(here.bits) ---//
                hold >>>= here_bits;
                bits -= here_bits;
                //---//
                if (state.have === 0) {
                  strm.msg = 'invalid bit length repeat';
                  state.mode = BAD;
                  break;
                }
                len = state.lens[state.have - 1];
                copy = 3 + (hold & 0x03); //BITS(2);
                //--- DROPBITS(2) ---//
                hold >>>= 2;
                bits -= 2;
                //---//
              } else if (here_val === 17) {
                //=== NEEDBITS(here.bits + 3);
                n = here_bits + 3;
                while (bits < n) {
                  if (have === 0) {
                    break inf_leave;
                  }
                  have--;
                  hold += input[next++] << bits;
                  bits += 8;
                }
                //===//
                //--- DROPBITS(here.bits) ---//
                hold >>>= here_bits;
                bits -= here_bits;
                //---//
                len = 0;
                copy = 3 + (hold & 0x07); //BITS(3);
                //--- DROPBITS(3) ---//
                hold >>>= 3;
                bits -= 3;
                //---//
              } else {
                //=== NEEDBITS(here.bits + 7);
                n = here_bits + 7;
                while (bits < n) {
                  if (have === 0) {
                    break inf_leave;
                  }
                  have--;
                  hold += input[next++] << bits;
                  bits += 8;
                }
                //===//
                //--- DROPBITS(here.bits) ---//
                hold >>>= here_bits;
                bits -= here_bits;
                //---//
                len = 0;
                copy = 11 + (hold & 0x7f); //BITS(7);
                //--- DROPBITS(7) ---//
                hold >>>= 7;
                bits -= 7;
                //---//
              }
              if (state.have + copy > state.nlen + state.ndist) {
                strm.msg = 'invalid bit length repeat';
                state.mode = BAD;
                break;
              }
              while (copy--) {
                state.lens[state.have++] = len;
              }
            }
          }

          /* handle error breaks in while */
          if (state.mode === BAD) {
            break;
          }

          /* check for end-of-block code (better have one) */
          if (state.lens[256] === 0) {
            strm.msg = 'invalid code -- missing end-of-block';
            state.mode = BAD;
            break;
          }

          /* build code tables -- note: do not change the lenbits or distbits
             values here (9 and 6) without reading the comments in inftrees.h
             concerning the ENOUGH constants, which depend on those values */
          state.lenbits = 9;

          opts = {
            bits: state.lenbits
          };
          ret = inflate_table(LENS, state.lens, 0, state.nlen, state.lencode, 0, state.work, opts);
          // We have separate tables & no pointers. 2 commented lines below not needed.
          // state.next_index = opts.table_index;
          state.lenbits = opts.bits;
          // state.lencode = state.next;

          if (ret) {
            strm.msg = 'invalid literal/lengths set';
            state.mode = BAD;
            break;
          }

          state.distbits = 6;
          //state.distcode.copy(state.codes);
          // Switch to use dynamic table
          state.distcode = state.distdyn;
          opts = {
            bits: state.distbits
          };
          ret = inflate_table(DISTS, state.lens, state.nlen, state.ndist, state.distcode, 0, state.work, opts);
          // We have separate tables & no pointers. 2 commented lines below not needed.
          // state.next_index = opts.table_index;
          state.distbits = opts.bits;
          // state.distcode = state.next;

          if (ret) {
            strm.msg = 'invalid distances set';
            state.mode = BAD;
            break;
          }
          //Tracev((stderr, 'inflate:       codes ok\n'));
          state.mode = LEN_;
          if (flush === Z_TREES$1) {
            break inf_leave;
          }
          /* falls through */
        case LEN_:
          state.mode = LEN;
          /* falls through */
        case LEN:
          if (have >= 6 && left >= 258) {
            //--- RESTORE() ---
            strm.next_out = put;
            strm.avail_out = left;
            strm.next_in = next;
            strm.avail_in = have;
            state.hold = hold;
            state.bits = bits;
            //---
            inflate_fast(strm, _out);
            //--- LOAD() ---
            put = strm.next_out;
            output = strm.output;
            left = strm.avail_out;
            next = strm.next_in;
            input = strm.input;
            have = strm.avail_in;
            hold = state.hold;
            bits = state.bits;
            //---

            if (state.mode === TYPE) {
              state.back = -1;
            }
            break;
          }
          state.back = 0;
          for (;;) {
            here = state.lencode[hold & ((1 << state.lenbits) - 1)]; /*BITS(state.lenbits)*/
            here_bits = here >>> 24;
            here_op = (here >>> 16) & 0xff;
            here_val = here & 0xffff;

            if (here_bits <= bits) {
              break;
            }
            //--- PULLBYTE() ---//
            if (have === 0) {
              break inf_leave;
            }
            have--;
            hold += input[next++] << bits;
            bits += 8;
            //---//
          }
          if (here_op && (here_op & 0xf0) === 0) {
            last_bits = here_bits;
            last_op = here_op;
            last_val = here_val;
            for (;;) {
              here = state.lencode[last_val +
                ((hold & ((1 << (last_bits + last_op)) - 1)) /*BITS(last.bits + last.op)*/ >> last_bits)];
              here_bits = here >>> 24;
              here_op = (here >>> 16) & 0xff;
              here_val = here & 0xffff;

              if ((last_bits + here_bits) <= bits) {
                break;
              }
              //--- PULLBYTE() ---//
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
              //---//
            }
            //--- DROPBITS(last.bits) ---//
            hold >>>= last_bits;
            bits -= last_bits;
            //---//
            state.back += last_bits;
          }
          //--- DROPBITS(here.bits) ---//
          hold >>>= here_bits;
          bits -= here_bits;
          //---//
          state.back += here_bits;
          state.length = here_val;
          if (here_op === 0) {
            //Tracevv((stderr, here.val >= 0x20 && here.val < 0x7f ?
            //        "inflate:         literal '%c'\n" :
            //        "inflate:         literal 0x%02x\n", here.val));
            state.mode = LIT;
            break;
          }
          if (here_op & 32) {
            //Tracevv((stderr, "inflate:         end of block\n"));
            state.back = -1;
            state.mode = TYPE;
            break;
          }
          if (here_op & 64) {
            strm.msg = 'invalid literal/length code';
            state.mode = BAD;
            break;
          }
          state.extra = here_op & 15;
          state.mode = LENEXT;
          /* falls through */
        case LENEXT:
          if (state.extra) {
            //=== NEEDBITS(state.extra);
            n = state.extra;
            while (bits < n) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            //===//
            state.length += hold & ((1 << state.extra) - 1) /*BITS(state.extra)*/ ;
            //--- DROPBITS(state.extra) ---//
            hold >>>= state.extra;
            bits -= state.extra;
            //---//
            state.back += state.extra;
          }
          //Tracevv((stderr, "inflate:         length %u\n", state.length));
          state.was = state.length;
          state.mode = DIST;
          /* falls through */
        case DIST:
          for (;;) {
            here = state.distcode[hold & ((1 << state.distbits) - 1)]; /*BITS(state.distbits)*/
            here_bits = here >>> 24;
            here_op = (here >>> 16) & 0xff;
            here_val = here & 0xffff;

            if ((here_bits) <= bits) {
              break;
            }
            //--- PULLBYTE() ---//
            if (have === 0) {
              break inf_leave;
            }
            have--;
            hold += input[next++] << bits;
            bits += 8;
            //---//
          }
          if ((here_op & 0xf0) === 0) {
            last_bits = here_bits;
            last_op = here_op;
            last_val = here_val;
            for (;;) {
              here = state.distcode[last_val +
                ((hold & ((1 << (last_bits + last_op)) - 1)) /*BITS(last.bits + last.op)*/ >> last_bits)];
              here_bits = here >>> 24;
              here_op = (here >>> 16) & 0xff;
              here_val = here & 0xffff;

              if ((last_bits + here_bits) <= bits) {
                break;
              }
              //--- PULLBYTE() ---//
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
              //---//
            }
            //--- DROPBITS(last.bits) ---//
            hold >>>= last_bits;
            bits -= last_bits;
            //---//
            state.back += last_bits;
          }
          //--- DROPBITS(here.bits) ---//
          hold >>>= here_bits;
          bits -= here_bits;
          //---//
          state.back += here_bits;
          if (here_op & 64) {
            strm.msg = 'invalid distance code';
            state.mode = BAD;
            break;
          }
          state.offset = here_val;
          state.extra = (here_op) & 15;
          state.mode = DISTEXT;
          /* falls through */
        case DISTEXT:
          if (state.extra) {
            //=== NEEDBITS(state.extra);
            n = state.extra;
            while (bits < n) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            //===//
            state.offset += hold & ((1 << state.extra) - 1) /*BITS(state.extra)*/ ;
            //--- DROPBITS(state.extra) ---//
            hold >>>= state.extra;
            bits -= state.extra;
            //---//
            state.back += state.extra;
          }
          //#ifdef INFLATE_STRICT
          if (state.offset > state.dmax) {
            strm.msg = 'invalid distance too far back';
            state.mode = BAD;
            break;
          }
          //#endif
          //Tracevv((stderr, "inflate:         distance %u\n", state.offset));
          state.mode = MATCH;
          /* falls through */
        case MATCH:
          if (left === 0) {
            break inf_leave;
          }
          copy = _out - left;
          if (state.offset > copy) { /* copy from window */
            copy = state.offset - copy;
            if (copy > state.whave) {
              if (state.sane) {
                strm.msg = 'invalid distance too far back';
                state.mode = BAD;
                break;
              }
              // (!) This block is disabled in zlib defailts,
              // don't enable it for binary compatibility
              //#ifdef INFLATE_ALLOW_INVALID_DISTANCE_TOOFAR_ARRR
              //          Trace((stderr, "inflate.c too far\n"));
              //          copy -= state.whave;
              //          if (copy > state.length) { copy = state.length; }
              //          if (copy > left) { copy = left; }
              //          left -= copy;
              //          state.length -= copy;
              //          do {
              //            output[put++] = 0;
              //          } while (--copy);
              //          if (state.length === 0) { state.mode = LEN; }
              //          break;
              //#endif
            }
            if (copy > state.wnext) {
              copy -= state.wnext;
              from = state.wsize - copy;
            } else {
              from = state.wnext - copy;
            }
            if (copy > state.length) {
              copy = state.length;
            }
            from_source = state.window;
          } else { /* copy from output */
            from_source = output;
            from = put - state.offset;
            copy = state.length;
          }
          if (copy > left) {
            copy = left;
          }
          left -= copy;
          state.length -= copy;
          do {
            output[put++] = from_source[from++];
          } while (--copy);
          if (state.length === 0) {
            state.mode = LEN;
          }
          break;
        case LIT:
          if (left === 0) {
            break inf_leave;
          }
          output[put++] = state.length;
          left--;
          state.mode = LEN;
          break;
        case CHECK:
          if (state.wrap) {
            //=== NEEDBITS(32);
            while (bits < 32) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              // Use '|' insdead of '+' to make sure that result is signed
              hold |= input[next++] << bits;
              bits += 8;
            }
            //===//
            _out -= left;
            strm.total_out += _out;
            state.total += _out;
            if (_out) {
              strm.adler = state.check =
                /*UPDATE(state.check, put - _out, _out);*/
                (state.flags ? crc32(state.check, output, _out, put - _out) : adler32(state.check, output, _out, put - _out));

            }
            _out = left;
            // NB: crc32 stored as signed 32-bit int, zswap32 returns signed too
            if ((state.flags ? hold : zswap32(hold)) !== state.check) {
              strm.msg = 'incorrect data check';
              state.mode = BAD;
              break;
            }
            //=== INITBITS();
            hold = 0;
            bits = 0;
            //===//
            //Tracev((stderr, "inflate:   check matches trailer\n"));
          }
          state.mode = LENGTH;
          /* falls through */
        case LENGTH:
          if (state.wrap && state.flags) {
            //=== NEEDBITS(32);
            while (bits < 32) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            //===//
            if (hold !== (state.total & 0xffffffff)) {
              strm.msg = 'incorrect length check';
              state.mode = BAD;
              break;
            }
            //=== INITBITS();
            hold = 0;
            bits = 0;
            //===//
            //Tracev((stderr, "inflate:   length matches trailer\n"));
          }
          state.mode = DONE;
          /* falls through */
        case DONE:
          ret = Z_STREAM_END$1;
          break inf_leave;
        case BAD:
          ret = Z_DATA_ERROR$1;
          break inf_leave;
        case MEM:
          return Z_MEM_ERROR;
        case SYNC:
          /* falls through */
        default:
          return Z_STREAM_ERROR$1;
        }
      }

    // inf_leave <- here is real place for "goto inf_leave", emulated via "break inf_leave"

    /*
       Return from inflate(), updating the total counts and the check value.
       If there was no progress during the inflate() call, return a buffer
       error.  Call updatewindow() to create and/or update the window state.
       Note: a memory error from inflate() is non-recoverable.
     */

    //--- RESTORE() ---
    strm.next_out = put;
    strm.avail_out = left;
    strm.next_in = next;
    strm.avail_in = have;
    state.hold = hold;
    state.bits = bits;
    //---

    if (state.wsize || (_out !== strm.avail_out && state.mode < BAD &&
        (state.mode < CHECK || flush !== Z_FINISH$1))) {
      if (updatewindow(strm, strm.output, strm.next_out, _out - strm.avail_out)) ;
    }
    _in -= strm.avail_in;
    _out -= strm.avail_out;
    strm.total_in += _in;
    strm.total_out += _out;
    state.total += _out;
    if (state.wrap && _out) {
      strm.adler = state.check = /*UPDATE(state.check, strm.next_out - _out, _out);*/
        (state.flags ? crc32(state.check, output, _out, strm.next_out - _out) : adler32(state.check, output, _out, strm.next_out - _out));
    }
    strm.data_type = state.bits + (state.last ? 64 : 0) +
      (state.mode === TYPE ? 128 : 0) +
      (state.mode === LEN_ || state.mode === COPY_ ? 256 : 0);
    if (((_in === 0 && _out === 0) || flush === Z_FINISH$1) && ret === Z_OK$1) {
      ret = Z_BUF_ERROR$1;
    }
    return ret;
  }

  function inflateEnd(strm) {

    if (!strm || !strm.state /*|| strm->zfree == (free_func)0*/ ) {
      return Z_STREAM_ERROR$1;
    }

    var state = strm.state;
    if (state.window) {
      state.window = null;
    }
    strm.state = null;
    return Z_OK$1;
  }

  /* Not implemented
  exports.inflateCopy = inflateCopy;
  exports.inflateGetDictionary = inflateGetDictionary;
  exports.inflateMark = inflateMark;
  exports.inflatePrime = inflatePrime;
  exports.inflateSync = inflateSync;
  exports.inflateSyncPoint = inflateSyncPoint;
  exports.inflateUndermine = inflateUndermine;
  */

  // import constants from './constants';


  // zlib modes
  var NONE = 0;
  var DEFLATE = 1;
  var INFLATE = 2;
  var GZIP = 3;
  var GUNZIP = 4;
  var DEFLATERAW = 5;
  var INFLATERAW = 6;
  var UNZIP = 7;
  var Z_NO_FLUSH=         0,
    Z_PARTIAL_FLUSH=    1,
    Z_SYNC_FLUSH=    2,
    Z_FULL_FLUSH=       3,
    Z_FINISH=       4,
    Z_BLOCK=           5,
    Z_TREES=            6,

    /* Return codes for the compression/decompression functions. Negative values
    * are errors, positive values are used for special but normal events.
    */
    Z_OK=               0,
    Z_STREAM_END=       1,
    Z_NEED_DICT=      2,
    Z_ERRNO=       -1,
    Z_STREAM_ERROR=   -2,
    Z_DATA_ERROR=    -3,
    //Z_MEM_ERROR:     -4,
    Z_BUF_ERROR=    -5,
    //Z_VERSION_ERROR: -6,

    /* compression levels */
    Z_NO_COMPRESSION=         0,
    Z_BEST_SPEED=             1,
    Z_BEST_COMPRESSION=       9,
    Z_DEFAULT_COMPRESSION=   -1,


    Z_FILTERED=               1,
    Z_HUFFMAN_ONLY=           2,
    Z_RLE=                    3,
    Z_FIXED=                  4,
    Z_DEFAULT_STRATEGY=       0,

    /* Possible values of the data_type field (though see inflate()) */
    Z_BINARY=                 0,
    Z_TEXT=                   1,
    //Z_ASCII:                1, // = Z_TEXT (deprecated)
    Z_UNKNOWN=                2,

    /* The deflate compression method */
    Z_DEFLATED=               8;
  function Zlib$1(mode) {
    if (mode < DEFLATE || mode > UNZIP)
      throw new TypeError('Bad argument');

    this.mode = mode;
    this.init_done = false;
    this.write_in_progress = false;
    this.pending_close = false;
    this.windowBits = 0;
    this.level = 0;
    this.memLevel = 0;
    this.strategy = 0;
    this.dictionary = null;
  }

  Zlib$1.prototype.init = function(windowBits, level, memLevel, strategy, dictionary) {
    this.windowBits = windowBits;
    this.level = level;
    this.memLevel = memLevel;
    this.strategy = strategy;
    // dictionary not supported.

    if (this.mode === GZIP || this.mode === GUNZIP)
      this.windowBits += 16;

    if (this.mode === UNZIP)
      this.windowBits += 32;

    if (this.mode === DEFLATERAW || this.mode === INFLATERAW)
      this.windowBits = -this.windowBits;

    this.strm = new ZStream();
    var status;
    switch (this.mode) {
    case DEFLATE:
    case GZIP:
    case DEFLATERAW:
      status = deflateInit2(
        this.strm,
        this.level,
        Z_DEFLATED,
        this.windowBits,
        this.memLevel,
        this.strategy
      );
      break;
    case INFLATE:
    case GUNZIP:
    case INFLATERAW:
    case UNZIP:
      status  = inflateInit2(
        this.strm,
        this.windowBits
      );
      break;
    default:
      throw new Error('Unknown mode ' + this.mode);
    }

    if (status !== Z_OK) {
      this._error(status);
      return;
    }

    this.write_in_progress = false;
    this.init_done = true;
  };

  Zlib$1.prototype.params = function() {
    throw new Error('deflateParams Not supported');
  };

  Zlib$1.prototype._writeCheck = function() {
    if (!this.init_done)
      throw new Error('write before init');

    if (this.mode === NONE)
      throw new Error('already finalized');

    if (this.write_in_progress)
      throw new Error('write already in progress');

    if (this.pending_close)
      throw new Error('close is pending');
  };

  Zlib$1.prototype.write = function(flush, input, in_off, in_len, out, out_off, out_len) {
    this._writeCheck();
    this.write_in_progress = true;

    var self = this;
    process.nextTick(function() {
      self.write_in_progress = false;
      var res = self._write(flush, input, in_off, in_len, out, out_off, out_len);
      self.callback(res[0], res[1]);

      if (self.pending_close)
        self.close();
    });

    return this;
  };

  // set method for Node buffers, used by pako
  function bufferSet(data, offset) {
    for (var i = 0; i < data.length; i++) {
      this[offset + i] = data[i];
    }
  }

  Zlib$1.prototype.writeSync = function(flush, input, in_off, in_len, out, out_off, out_len) {
    this._writeCheck();
    return this._write(flush, input, in_off, in_len, out, out_off, out_len);
  };

  Zlib$1.prototype._write = function(flush, input, in_off, in_len, out, out_off, out_len) {
    this.write_in_progress = true;

    if (flush !== Z_NO_FLUSH &&
        flush !== Z_PARTIAL_FLUSH &&
        flush !== Z_SYNC_FLUSH &&
        flush !== Z_FULL_FLUSH &&
        flush !== Z_FINISH &&
        flush !== Z_BLOCK) {
      throw new Error('Invalid flush value');
    }

    if (input == null) {
      input = new Buffer(0);
      in_len = 0;
      in_off = 0;
    }

    if (out._set)
      out.set = out._set;
    else
      out.set = bufferSet;

    var strm = this.strm;
    strm.avail_in = in_len;
    strm.input = input;
    strm.next_in = in_off;
    strm.avail_out = out_len;
    strm.output = out;
    strm.next_out = out_off;
    var status;
    switch (this.mode) {
    case DEFLATE:
    case GZIP:
    case DEFLATERAW:
      status = deflate$1(strm, flush);
      break;
    case UNZIP:
    case INFLATE:
    case GUNZIP:
    case INFLATERAW:
      status = inflate$1(strm, flush);
      break;
    default:
      throw new Error('Unknown mode ' + this.mode);
    }

    if (status !== Z_STREAM_END && status !== Z_OK) {
      this._error(status);
    }

    this.write_in_progress = false;
    return [strm.avail_in, strm.avail_out];
  };

  Zlib$1.prototype.close = function() {
    if (this.write_in_progress) {
      this.pending_close = true;
      return;
    }

    this.pending_close = false;

    if (this.mode === DEFLATE || this.mode === GZIP || this.mode === DEFLATERAW) {
      deflateEnd(this.strm);
    } else {
      inflateEnd(this.strm);
    }

    this.mode = NONE;
  };
  var status;
  Zlib$1.prototype.reset = function() {
    switch (this.mode) {
    case DEFLATE:
    case DEFLATERAW:
      status = deflateReset(this.strm);
      break;
    case INFLATE:
    case INFLATERAW:
      status = inflateReset(this.strm);
      break;
    }

    if (status !== Z_OK) {
      this._error(status);
    }
  };

  Zlib$1.prototype._error = function(status) {
    this.onerror(msg[status] + ': ' + this.strm.msg, status);

    this.write_in_progress = false;
    if (this.pending_close)
      this.close();
  };

  var _binding = /*#__PURE__*/Object.freeze({
    __proto__: null,
    NONE: NONE,
    DEFLATE: DEFLATE,
    INFLATE: INFLATE,
    GZIP: GZIP,
    GUNZIP: GUNZIP,
    DEFLATERAW: DEFLATERAW,
    INFLATERAW: INFLATERAW,
    UNZIP: UNZIP,
    Z_NO_FLUSH: Z_NO_FLUSH,
    Z_PARTIAL_FLUSH: Z_PARTIAL_FLUSH,
    Z_SYNC_FLUSH: Z_SYNC_FLUSH,
    Z_FULL_FLUSH: Z_FULL_FLUSH,
    Z_FINISH: Z_FINISH,
    Z_BLOCK: Z_BLOCK,
    Z_TREES: Z_TREES,
    Z_OK: Z_OK,
    Z_STREAM_END: Z_STREAM_END,
    Z_NEED_DICT: Z_NEED_DICT,
    Z_ERRNO: Z_ERRNO,
    Z_STREAM_ERROR: Z_STREAM_ERROR,
    Z_DATA_ERROR: Z_DATA_ERROR,
    Z_BUF_ERROR: Z_BUF_ERROR,
    Z_NO_COMPRESSION: Z_NO_COMPRESSION,
    Z_BEST_SPEED: Z_BEST_SPEED,
    Z_BEST_COMPRESSION: Z_BEST_COMPRESSION,
    Z_DEFAULT_COMPRESSION: Z_DEFAULT_COMPRESSION,
    Z_FILTERED: Z_FILTERED,
    Z_HUFFMAN_ONLY: Z_HUFFMAN_ONLY,
    Z_RLE: Z_RLE,
    Z_FIXED: Z_FIXED,
    Z_DEFAULT_STRATEGY: Z_DEFAULT_STRATEGY,
    Z_BINARY: Z_BINARY,
    Z_TEXT: Z_TEXT,
    Z_UNKNOWN: Z_UNKNOWN,
    Z_DEFLATED: Z_DEFLATED,
    Zlib: Zlib$1
  });

  function assert (a, msg) {
    if (!a) {
      throw new Error(msg);
    }
  }
  var binding = {};
  Object.keys(_binding).forEach(function (key) {
    binding[key] = _binding[key];
  });
  // zlib doesn't provide these, so kludge them in following the same
  // const naming scheme zlib uses.
  binding.Z_MIN_WINDOWBITS = 8;
  binding.Z_MAX_WINDOWBITS = 15;
  binding.Z_DEFAULT_WINDOWBITS = 15;

  // fewer than 64 bytes per chunk is stupid.
  // technically it could work with as few as 8, but even 64 bytes
  // is absurdly low.  Usually a MB or more is best.
  binding.Z_MIN_CHUNK = 64;
  binding.Z_MAX_CHUNK = Infinity;
  binding.Z_DEFAULT_CHUNK = (16 * 1024);

  binding.Z_MIN_MEMLEVEL = 1;
  binding.Z_MAX_MEMLEVEL = 9;
  binding.Z_DEFAULT_MEMLEVEL = 8;

  binding.Z_MIN_LEVEL = -1;
  binding.Z_MAX_LEVEL = 9;
  binding.Z_DEFAULT_LEVEL = binding.Z_DEFAULT_COMPRESSION;


  // translation table for return codes.
  var codes = {
    Z_OK: binding.Z_OK,
    Z_STREAM_END: binding.Z_STREAM_END,
    Z_NEED_DICT: binding.Z_NEED_DICT,
    Z_ERRNO: binding.Z_ERRNO,
    Z_STREAM_ERROR: binding.Z_STREAM_ERROR,
    Z_DATA_ERROR: binding.Z_DATA_ERROR,
    Z_MEM_ERROR: binding.Z_MEM_ERROR,
    Z_BUF_ERROR: binding.Z_BUF_ERROR,
    Z_VERSION_ERROR: binding.Z_VERSION_ERROR
  };

  Object.keys(codes).forEach(function(k) {
    codes[codes[k]] = k;
  });

  function createDeflate(o) {
    return new Deflate(o);
  }

  function createInflate(o) {
    return new Inflate(o);
  }

  function createDeflateRaw(o) {
    return new DeflateRaw(o);
  }

  function createInflateRaw(o) {
    return new InflateRaw(o);
  }

  function createGzip(o) {
    return new Gzip(o);
  }

  function createGunzip(o) {
    return new Gunzip(o);
  }

  function createUnzip(o) {
    return new Unzip(o);
  }


  // Convenience methods.
  // compress/decompress a string or buffer in one step.
  function deflate(buffer, opts, callback) {
    if (typeof opts === 'function') {
      callback = opts;
      opts = {};
    }
    return zlibBuffer(new Deflate(opts), buffer, callback);
  }

  function deflateSync(buffer, opts) {
    return zlibBufferSync(new Deflate(opts), buffer);
  }

  function gzip(buffer, opts, callback) {
    if (typeof opts === 'function') {
      callback = opts;
      opts = {};
    }
    return zlibBuffer(new Gzip(opts), buffer, callback);
  }

  function gzipSync(buffer, opts) {
    return zlibBufferSync(new Gzip(opts), buffer);
  }

  function deflateRaw(buffer, opts, callback) {
    if (typeof opts === 'function') {
      callback = opts;
      opts = {};
    }
    return zlibBuffer(new DeflateRaw(opts), buffer, callback);
  }

  function deflateRawSync(buffer, opts) {
    return zlibBufferSync(new DeflateRaw(opts), buffer);
  }

  function unzip(buffer, opts, callback) {
    if (typeof opts === 'function') {
      callback = opts;
      opts = {};
    }
    return zlibBuffer(new Unzip(opts), buffer, callback);
  }

  function unzipSync(buffer, opts) {
    return zlibBufferSync(new Unzip(opts), buffer);
  }

  function inflate(buffer, opts, callback) {
    if (typeof opts === 'function') {
      callback = opts;
      opts = {};
    }
    return zlibBuffer(new Inflate(opts), buffer, callback);
  }

  function inflateSync(buffer, opts) {
    return zlibBufferSync(new Inflate(opts), buffer);
  }

  function gunzip(buffer, opts, callback) {
    if (typeof opts === 'function') {
      callback = opts;
      opts = {};
    }
    return zlibBuffer(new Gunzip(opts), buffer, callback);
  }

  function gunzipSync(buffer, opts) {
    return zlibBufferSync(new Gunzip(opts), buffer);
  }

  function inflateRaw(buffer, opts, callback) {
    if (typeof opts === 'function') {
      callback = opts;
      opts = {};
    }
    return zlibBuffer(new InflateRaw(opts), buffer, callback);
  }

  function inflateRawSync(buffer, opts) {
    return zlibBufferSync(new InflateRaw(opts), buffer);
  }

  function zlibBuffer(engine, buffer, callback) {
    var buffers = [];
    var nread = 0;

    engine.on('error', onError);
    engine.on('end', onEnd);

    engine.end(buffer);
    flow();

    function flow() {
      var chunk;
      while (null !== (chunk = engine.read())) {
        buffers.push(chunk);
        nread += chunk.length;
      }
      engine.once('readable', flow);
    }

    function onError(err) {
      engine.removeListener('end', onEnd);
      engine.removeListener('readable', flow);
      callback(err);
    }

    function onEnd() {
      var buf = Buffer.concat(buffers, nread);
      buffers = [];
      callback(null, buf);
      engine.close();
    }
  }

  function zlibBufferSync(engine, buffer) {
    if (typeof buffer === 'string')
      buffer = new Buffer(buffer);
    if (!Buffer.isBuffer(buffer))
      throw new TypeError('Not a string or buffer');

    var flushFlag = binding.Z_FINISH;

    return engine._processChunk(buffer, flushFlag);
  }

  // generic zlib
  // minimal 2-byte header
  function Deflate(opts) {
    if (!(this instanceof Deflate)) return new Deflate(opts);
    Zlib.call(this, opts, binding.DEFLATE);
  }

  function Inflate(opts) {
    if (!(this instanceof Inflate)) return new Inflate(opts);
    Zlib.call(this, opts, binding.INFLATE);
  }



  // gzip - bigger header, same deflate compression
  function Gzip(opts) {
    if (!(this instanceof Gzip)) return new Gzip(opts);
    Zlib.call(this, opts, binding.GZIP);
  }

  function Gunzip(opts) {
    if (!(this instanceof Gunzip)) return new Gunzip(opts);
    Zlib.call(this, opts, binding.GUNZIP);
  }



  // raw - no header
  function DeflateRaw(opts) {
    if (!(this instanceof DeflateRaw)) return new DeflateRaw(opts);
    Zlib.call(this, opts, binding.DEFLATERAW);
  }

  function InflateRaw(opts) {
    if (!(this instanceof InflateRaw)) return new InflateRaw(opts);
    Zlib.call(this, opts, binding.INFLATERAW);
  }


  // auto-detect header.
  function Unzip(opts) {
    if (!(this instanceof Unzip)) return new Unzip(opts);
    Zlib.call(this, opts, binding.UNZIP);
  }


  // the Zlib class they all inherit from
  // This thing manages the queue of requests, and returns
  // true or false if there is anything in the queue when
  // you call the .write() method.

  function Zlib(opts, mode) {
    this._opts = opts = opts || {};
    this._chunkSize = opts.chunkSize || binding.Z_DEFAULT_CHUNK;

    Transform.call(this, opts);

    if (opts.flush) {
      if (opts.flush !== binding.Z_NO_FLUSH &&
          opts.flush !== binding.Z_PARTIAL_FLUSH &&
          opts.flush !== binding.Z_SYNC_FLUSH &&
          opts.flush !== binding.Z_FULL_FLUSH &&
          opts.flush !== binding.Z_FINISH &&
          opts.flush !== binding.Z_BLOCK) {
        throw new Error('Invalid flush flag: ' + opts.flush);
      }
    }
    this._flushFlag = opts.flush || binding.Z_NO_FLUSH;

    if (opts.chunkSize) {
      if (opts.chunkSize < binding.Z_MIN_CHUNK ||
          opts.chunkSize > binding.Z_MAX_CHUNK) {
        throw new Error('Invalid chunk size: ' + opts.chunkSize);
      }
    }

    if (opts.windowBits) {
      if (opts.windowBits < binding.Z_MIN_WINDOWBITS ||
          opts.windowBits > binding.Z_MAX_WINDOWBITS) {
        throw new Error('Invalid windowBits: ' + opts.windowBits);
      }
    }

    if (opts.level) {
      if (opts.level < binding.Z_MIN_LEVEL ||
          opts.level > binding.Z_MAX_LEVEL) {
        throw new Error('Invalid compression level: ' + opts.level);
      }
    }

    if (opts.memLevel) {
      if (opts.memLevel < binding.Z_MIN_MEMLEVEL ||
          opts.memLevel > binding.Z_MAX_MEMLEVEL) {
        throw new Error('Invalid memLevel: ' + opts.memLevel);
      }
    }

    if (opts.strategy) {
      if (opts.strategy != binding.Z_FILTERED &&
          opts.strategy != binding.Z_HUFFMAN_ONLY &&
          opts.strategy != binding.Z_RLE &&
          opts.strategy != binding.Z_FIXED &&
          opts.strategy != binding.Z_DEFAULT_STRATEGY) {
        throw new Error('Invalid strategy: ' + opts.strategy);
      }
    }

    if (opts.dictionary) {
      if (!Buffer.isBuffer(opts.dictionary)) {
        throw new Error('Invalid dictionary: it should be a Buffer instance');
      }
    }

    this._binding = new binding.Zlib(mode);

    var self = this;
    this._hadError = false;
    this._binding.onerror = function(message, errno) {
      // there is no way to cleanly recover.
      // continuing only obscures problems.
      self._binding = null;
      self._hadError = true;

      var error = new Error(message);
      error.errno = errno;
      error.code = binding.codes[errno];
      self.emit('error', error);
    };

    var level = binding.Z_DEFAULT_COMPRESSION;
    if (typeof opts.level === 'number') level = opts.level;

    var strategy = binding.Z_DEFAULT_STRATEGY;
    if (typeof opts.strategy === 'number') strategy = opts.strategy;

    this._binding.init(opts.windowBits || binding.Z_DEFAULT_WINDOWBITS,
                       level,
                       opts.memLevel || binding.Z_DEFAULT_MEMLEVEL,
                       strategy,
                       opts.dictionary);

    this._buffer = new Buffer(this._chunkSize);
    this._offset = 0;
    this._closed = false;
    this._level = level;
    this._strategy = strategy;

    this.once('end', this.close);
  }

  inherits$1(Zlib, Transform);

  Zlib.prototype.params = function(level, strategy, callback) {
    if (level < binding.Z_MIN_LEVEL ||
        level > binding.Z_MAX_LEVEL) {
      throw new RangeError('Invalid compression level: ' + level);
    }
    if (strategy != binding.Z_FILTERED &&
        strategy != binding.Z_HUFFMAN_ONLY &&
        strategy != binding.Z_RLE &&
        strategy != binding.Z_FIXED &&
        strategy != binding.Z_DEFAULT_STRATEGY) {
      throw new TypeError('Invalid strategy: ' + strategy);
    }

    if (this._level !== level || this._strategy !== strategy) {
      var self = this;
      this.flush(binding.Z_SYNC_FLUSH, function() {
        self._binding.params(level, strategy);
        if (!self._hadError) {
          self._level = level;
          self._strategy = strategy;
          if (callback) callback();
        }
      });
    } else {
      process.nextTick(callback);
    }
  };

  Zlib.prototype.reset = function() {
    return this._binding.reset();
  };

  // This is the _flush function called by the transform class,
  // internally, when the last chunk has been written.
  Zlib.prototype._flush = function(callback) {
    this._transform(new Buffer(0), '', callback);
  };

  Zlib.prototype.flush = function(kind, callback) {
    var ws = this._writableState;

    if (typeof kind === 'function' || (kind === void 0 && !callback)) {
      callback = kind;
      kind = binding.Z_FULL_FLUSH;
    }

    if (ws.ended) {
      if (callback)
        process.nextTick(callback);
    } else if (ws.ending) {
      if (callback)
        this.once('end', callback);
    } else if (ws.needDrain) {
      var self = this;
      this.once('drain', function() {
        self.flush(callback);
      });
    } else {
      this._flushFlag = kind;
      this.write(new Buffer(0), '', callback);
    }
  };

  Zlib.prototype.close = function(callback) {
    if (callback)
      process.nextTick(callback);

    if (this._closed)
      return;

    this._closed = true;

    this._binding.close();

    var self = this;
    process.nextTick(function() {
      self.emit('close');
    });
  };

  Zlib.prototype._transform = function(chunk, encoding, cb) {
    var flushFlag;
    var ws = this._writableState;
    var ending = ws.ending || ws.ended;
    var last = ending && (!chunk || ws.length === chunk.length);

    if (!chunk === null && !Buffer.isBuffer(chunk))
      return cb(new Error('invalid input'));

    // If it's the last chunk, or a final flush, we use the Z_FINISH flush flag.
    // If it's explicitly flushing at some other time, then we use
    // Z_FULL_FLUSH. Otherwise, use Z_NO_FLUSH for maximum compression
    // goodness.
    if (last)
      flushFlag = binding.Z_FINISH;
    else {
      flushFlag = this._flushFlag;
      // once we've flushed the last of the queue, stop flushing and
      // go back to the normal behavior.
      if (chunk.length >= ws.length) {
        this._flushFlag = this._opts.flush || binding.Z_NO_FLUSH;
      }
    }

    this._processChunk(chunk, flushFlag, cb);
  };

  Zlib.prototype._processChunk = function(chunk, flushFlag, cb) {
    var availInBefore = chunk && chunk.length;
    var availOutBefore = this._chunkSize - this._offset;
    var inOff = 0;

    var self = this;

    var async = typeof cb === 'function';

    if (!async) {
      var buffers = [];
      var nread = 0;

      var error;
      this.on('error', function(er) {
        error = er;
      });

      do {
        var res = this._binding.writeSync(flushFlag,
                                          chunk, // in
                                          inOff, // in_off
                                          availInBefore, // in_len
                                          this._buffer, // out
                                          this._offset, //out_off
                                          availOutBefore); // out_len
      } while (!this._hadError && callback(res[0], res[1]));

      if (this._hadError) {
        throw error;
      }

      var buf = Buffer.concat(buffers, nread);
      this.close();

      return buf;
    }

    var req = this._binding.write(flushFlag,
                                  chunk, // in
                                  inOff, // in_off
                                  availInBefore, // in_len
                                  this._buffer, // out
                                  this._offset, //out_off
                                  availOutBefore); // out_len

    req.buffer = chunk;
    req.callback = callback;

    function callback(availInAfter, availOutAfter) {
      if (self._hadError)
        return;

      var have = availOutBefore - availOutAfter;
      assert(have >= 0, 'have should not go down');

      if (have > 0) {
        var out = self._buffer.slice(self._offset, self._offset + have);
        self._offset += have;
        // serve some output to the consumer.
        if (async) {
          self.push(out);
        } else {
          buffers.push(out);
          nread += out.length;
        }
      }

      // exhausted the output buffer, or used all the input create a new one.
      if (availOutAfter === 0 || self._offset >= self._chunkSize) {
        availOutBefore = self._chunkSize;
        self._offset = 0;
        self._buffer = new Buffer(self._chunkSize);
      }

      if (availOutAfter === 0) {
        // Not actually done.  Need to reprocess.
        // Also, update the availInBefore to the availInAfter value,
        // so that if we have to hit it a third (fourth, etc.) time,
        // it'll have the correct byte counts.
        inOff += (availInBefore - availInAfter);
        availInBefore = availInAfter;

        if (!async)
          return true;

        var newReq = self._binding.write(flushFlag,
                                         chunk,
                                         inOff,
                                         availInBefore,
                                         self._buffer,
                                         self._offset,
                                         self._chunkSize);
        newReq.callback = callback; // this same function
        newReq.buffer = chunk;
        return;
      }

      if (!async)
        return false;

      // finished with the chunk.
      cb();
    }
  };

  inherits$1(Deflate, Zlib);
  inherits$1(Inflate, Zlib);
  inherits$1(Gzip, Zlib);
  inherits$1(Gunzip, Zlib);
  inherits$1(DeflateRaw, Zlib);
  inherits$1(InflateRaw, Zlib);
  inherits$1(Unzip, Zlib);
  var zlib$1 = {
    codes: codes,
    createDeflate: createDeflate,
    createInflate: createInflate,
    createDeflateRaw: createDeflateRaw,
    createInflateRaw: createInflateRaw,
    createGzip: createGzip,
    createGunzip: createGunzip,
    createUnzip: createUnzip,
    deflate: deflate,
    deflateSync: deflateSync,
    gzip: gzip,
    gzipSync: gzipSync,
    deflateRaw: deflateRaw,
    deflateRawSync: deflateRawSync,
    unzip: unzip,
    unzipSync: unzipSync,
    inflate: inflate,
    inflateSync: inflateSync,
    gunzip: gunzip,
    gunzipSync: gunzipSync,
    inflateRaw: inflateRaw,
    inflateRawSync: inflateRawSync,
    Deflate: Deflate,
    Inflate: Inflate,
    Gzip: Gzip,
    Gunzip: Gunzip,
    DeflateRaw: DeflateRaw,
    InflateRaw: InflateRaw,
    Unzip: Unzip,
    Zlib: Zlib
  };

  var zlib$2 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    codes: codes,
    createDeflate: createDeflate,
    createInflate: createInflate,
    createDeflateRaw: createDeflateRaw,
    createInflateRaw: createInflateRaw,
    createGzip: createGzip,
    createGunzip: createGunzip,
    createUnzip: createUnzip,
    deflate: deflate,
    deflateSync: deflateSync,
    gzip: gzip,
    gzipSync: gzipSync,
    deflateRaw: deflateRaw,
    deflateRawSync: deflateRawSync,
    unzip: unzip,
    unzipSync: unzipSync,
    inflate: inflate,
    inflateSync: inflateSync,
    gunzip: gunzip,
    gunzipSync: gunzipSync,
    inflateRaw: inflateRaw,
    inflateRawSync: inflateRawSync,
    Deflate: Deflate,
    Inflate: Inflate,
    Gzip: Gzip,
    Gunzip: Gunzip,
    DeflateRaw: DeflateRaw,
    InflateRaw: InflateRaw,
    Unzip: Unzip,
    Zlib: Zlib,
    'default': zlib$1
  });

  var name = "axios";
  var version = "0.21.1";
  var description = "Promise based HTTP client for the browser and node.js";
  var main = "index.js";
  var scripts = {
  	test: "grunt test && bundlesize",
  	start: "node ./sandbox/server.js",
  	build: "NODE_ENV=production grunt build",
  	preversion: "npm test",
  	version: "npm run build && grunt version && git add -A dist && git add CHANGELOG.md bower.json package.json",
  	postversion: "git push && git push --tags",
  	examples: "node ./examples/server.js",
  	coveralls: "cat coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js",
  	fix: "eslint --fix lib/**/*.js"
  };
  var repository = {
  	type: "git",
  	url: "https://github.com/axios/axios.git"
  };
  var keywords = [
  	"xhr",
  	"http",
  	"ajax",
  	"promise",
  	"node"
  ];
  var author = "Matt Zabriskie";
  var license = "MIT";
  var bugs = {
  	url: "https://github.com/axios/axios/issues"
  };
  var homepage = "https://github.com/axios/axios";
  var devDependencies = {
  	bundlesize: "^0.17.0",
  	coveralls: "^3.0.0",
  	"es6-promise": "^4.2.4",
  	grunt: "^1.0.2",
  	"grunt-banner": "^0.6.0",
  	"grunt-cli": "^1.2.0",
  	"grunt-contrib-clean": "^1.1.0",
  	"grunt-contrib-watch": "^1.0.0",
  	"grunt-eslint": "^20.1.0",
  	"grunt-karma": "^2.0.0",
  	"grunt-mocha-test": "^0.13.3",
  	"grunt-ts": "^6.0.0-beta.19",
  	"grunt-webpack": "^1.0.18",
  	"istanbul-instrumenter-loader": "^1.0.0",
  	"jasmine-core": "^2.4.1",
  	karma: "^1.3.0",
  	"karma-chrome-launcher": "^2.2.0",
  	"karma-coverage": "^1.1.1",
  	"karma-firefox-launcher": "^1.1.0",
  	"karma-jasmine": "^1.1.1",
  	"karma-jasmine-ajax": "^0.1.13",
  	"karma-opera-launcher": "^1.0.0",
  	"karma-safari-launcher": "^1.0.0",
  	"karma-sauce-launcher": "^1.2.0",
  	"karma-sinon": "^1.0.5",
  	"karma-sourcemap-loader": "^0.3.7",
  	"karma-webpack": "^1.7.0",
  	"load-grunt-tasks": "^3.5.2",
  	minimist: "^1.2.0",
  	mocha: "^5.2.0",
  	sinon: "^4.5.0",
  	typescript: "^2.8.1",
  	"url-search-params": "^0.10.0",
  	webpack: "^1.13.1",
  	"webpack-dev-server": "^1.14.1"
  };
  var browser = {
  	"./lib/adapters/http.js": "./lib/adapters/xhr.js"
  };
  var jsdelivr = "dist/axios.min.js";
  var unpkg = "dist/axios.min.js";
  var typings = "./index.d.ts";
  var dependencies = {
  	"follow-redirects": "^1.10.0"
  };
  var bundlesize = [
  	{
  		path: "./dist/axios.min.js",
  		threshold: "5kB"
  	}
  ];
  var pkg = {
  	name: name,
  	version: version,
  	description: description,
  	main: main,
  	scripts: scripts,
  	repository: repository,
  	keywords: keywords,
  	author: author,
  	license: license,
  	bugs: bugs,
  	homepage: homepage,
  	devDependencies: devDependencies,
  	browser: browser,
  	jsdelivr: jsdelivr,
  	unpkg: unpkg,
  	typings: typings,
  	dependencies: dependencies,
  	bundlesize: bundlesize
  };

  var zlib = /*@__PURE__*/getAugmentedNamespace(zlib$2);

  var httpFollow = followRedirects.http;
  var httpsFollow = followRedirects.https;






  var isHttps = /https:?/;

  /**
   *
   * @param {http.ClientRequestArgs} options
   * @param {AxiosProxyConfig} proxy
   * @param {string} location
   */
  function setProxy(options, proxy, location) {
    options.hostname = proxy.host;
    options.host = proxy.host;
    options.port = proxy.port;
    options.path = location;

    // Basic proxy authorization
    if (proxy.auth) {
      var base64 = Buffer.from(proxy.auth.username + ':' + proxy.auth.password, 'utf8').toString('base64');
      options.headers['Proxy-Authorization'] = 'Basic ' + base64;
    }

    // If a proxy is used, any redirects must also pass through the proxy
    options.beforeRedirect = function beforeRedirect(redirection) {
      redirection.headers.host = redirection.host;
      setProxy(redirection, proxy, redirection.href);
    };
  }

  /*eslint consistent-return:0*/
  var http_1 = function httpAdapter(config) {
    return new Promise(function dispatchHttpRequest(resolvePromise, rejectPromise) {
      var resolve = function resolve(value) {
        resolvePromise(value);
      };
      var reject = function reject(value) {
        rejectPromise(value);
      };
      var data = config.data;
      var headers = config.headers;

      // Set User-Agent (required by some servers)
      // Only set header if it hasn't been set in config
      // See https://github.com/axios/axios/issues/69
      if (!headers['User-Agent'] && !headers['user-agent']) {
        headers['User-Agent'] = 'axios/' + pkg.version;
      }

      if (data && !utils.isStream(data)) {
        if (Buffer.isBuffer(data)) ; else if (utils.isArrayBuffer(data)) {
          data = Buffer.from(new Uint8Array(data));
        } else if (utils.isString(data)) {
          data = Buffer.from(data, 'utf-8');
        } else {
          return reject(createError(
            'Data after transformation must be a string, an ArrayBuffer, a Buffer, or a Stream',
            config
          ));
        }

        // Add Content-Length header if data exists
        headers['Content-Length'] = data.length;
      }

      // HTTP basic authentication
      var auth = undefined;
      if (config.auth) {
        var username = config.auth.username || '';
        var password = config.auth.password || '';
        auth = username + ':' + password;
      }

      // Parse url
      var fullPath = buildFullPath(config.baseURL, config.url);
      var parsed = url.parse(fullPath);
      var protocol = parsed.protocol || 'http:';

      if (!auth && parsed.auth) {
        var urlAuth = parsed.auth.split(':');
        var urlUsername = urlAuth[0] || '';
        var urlPassword = urlAuth[1] || '';
        auth = urlUsername + ':' + urlPassword;
      }

      if (auth) {
        delete headers.Authorization;
      }

      var isHttpsRequest = isHttps.test(protocol);
      var agent = isHttpsRequest ? config.httpsAgent : config.httpAgent;

      var options = {
        path: buildURL(parsed.path, config.params, config.paramsSerializer).replace(/^\?/, ''),
        method: config.method.toUpperCase(),
        headers: headers,
        agent: agent,
        agents: { http: config.httpAgent, https: config.httpsAgent },
        auth: auth
      };

      if (config.socketPath) {
        options.socketPath = config.socketPath;
      } else {
        options.hostname = parsed.hostname;
        options.port = parsed.port;
      }

      var proxy = config.proxy;
      if (!proxy && proxy !== false) {
        var proxyEnv = protocol.slice(0, -1) + '_proxy';
        var proxyUrl = process.env[proxyEnv] || process.env[proxyEnv.toUpperCase()];
        if (proxyUrl) {
          var parsedProxyUrl = url.parse(proxyUrl);
          var noProxyEnv = process.env.no_proxy || process.env.NO_PROXY;
          var shouldProxy = true;

          if (noProxyEnv) {
            var noProxy = noProxyEnv.split(',').map(function trim(s) {
              return s.trim();
            });

            shouldProxy = !noProxy.some(function proxyMatch(proxyElement) {
              if (!proxyElement) {
                return false;
              }
              if (proxyElement === '*') {
                return true;
              }
              if (proxyElement[0] === '.' &&
                  parsed.hostname.substr(parsed.hostname.length - proxyElement.length) === proxyElement) {
                return true;
              }

              return parsed.hostname === proxyElement;
            });
          }

          if (shouldProxy) {
            proxy = {
              host: parsedProxyUrl.hostname,
              port: parsedProxyUrl.port,
              protocol: parsedProxyUrl.protocol
            };

            if (parsedProxyUrl.auth) {
              var proxyUrlAuth = parsedProxyUrl.auth.split(':');
              proxy.auth = {
                username: proxyUrlAuth[0],
                password: proxyUrlAuth[1]
              };
            }
          }
        }
      }

      if (proxy) {
        options.headers.host = parsed.hostname + (parsed.port ? ':' + parsed.port : '');
        setProxy(options, proxy, protocol + '//' + parsed.hostname + (parsed.port ? ':' + parsed.port : '') + options.path);
      }

      var transport;
      var isHttpsProxy = isHttpsRequest && (proxy ? isHttps.test(proxy.protocol) : true);
      if (config.transport) {
        transport = config.transport;
      } else if (config.maxRedirects === 0) {
        transport = isHttpsProxy ? http : http;
      } else {
        if (config.maxRedirects) {
          options.maxRedirects = config.maxRedirects;
        }
        transport = isHttpsProxy ? httpsFollow : httpFollow;
      }

      if (config.maxBodyLength > -1) {
        options.maxBodyLength = config.maxBodyLength;
      }

      // Create the request
      var req = transport.request(options, function handleResponse(res) {
        if (req.aborted) return;

        // uncompress the response body transparently if required
        var stream = res;

        // return the last request in case of redirects
        var lastRequest = res.req || req;


        // if no content, is HEAD request or decompress disabled we should not decompress
        if (res.statusCode !== 204 && lastRequest.method !== 'HEAD' && config.decompress !== false) {
          switch (res.headers['content-encoding']) {
          /*eslint default-case:0*/
          case 'gzip':
          case 'compress':
          case 'deflate':
          // add the unzipper to the body stream processing pipeline
            stream = stream.pipe(zlib.createUnzip());

            // remove the content-encoding in order to not confuse downstream operations
            delete res.headers['content-encoding'];
            break;
          }
        }

        var response = {
          status: res.statusCode,
          statusText: res.statusMessage,
          headers: res.headers,
          config: config,
          request: lastRequest
        };

        if (config.responseType === 'stream') {
          response.data = stream;
          settle(resolve, reject, response);
        } else {
          var responseBuffer = [];
          stream.on('data', function handleStreamData(chunk) {
            responseBuffer.push(chunk);

            // make sure the content length is not over the maxContentLength if specified
            if (config.maxContentLength > -1 && Buffer.concat(responseBuffer).length > config.maxContentLength) {
              stream.destroy();
              reject(createError('maxContentLength size of ' + config.maxContentLength + ' exceeded',
                config, null, lastRequest));
            }
          });

          stream.on('error', function handleStreamError(err) {
            if (req.aborted) return;
            reject(enhanceError(err, config, null, lastRequest));
          });

          stream.on('end', function handleStreamEnd() {
            var responseData = Buffer.concat(responseBuffer);
            if (config.responseType !== 'arraybuffer') {
              responseData = responseData.toString(config.responseEncoding);
              if (!config.responseEncoding || config.responseEncoding === 'utf8') {
                responseData = utils.stripBOM(responseData);
              }
            }

            response.data = responseData;
            settle(resolve, reject, response);
          });
        }
      });

      // Handle errors
      req.on('error', function handleRequestError(err) {
        if (req.aborted && err.code !== 'ERR_FR_TOO_MANY_REDIRECTS') return;
        reject(enhanceError(err, config, null, req));
      });

      // Handle request timeout
      if (config.timeout) {
        // Sometime, the response will be very slow, and does not respond, the connect event will be block by event loop system.
        // And timer callback will be fired, and abort() will be invoked before connection, then get "socket hang up" and code ECONNRESET.
        // At this time, if we have a large number of request, nodejs will hang up some socket on background. and the number will up and up.
        // And then these socket which be hang up will devoring CPU little by little.
        // ClientRequest.setTimeout will be fired on the specify milliseconds, and can make sure that abort() will be fired after connect.
        req.setTimeout(config.timeout, function handleRequestTimeout() {
          req.abort();
          reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED', req));
        });
      }

      if (config.cancelToken) {
        // Handle cancellation
        config.cancelToken.promise.then(function onCanceled(cancel) {
          if (req.aborted) return;

          req.abort();
          reject(cancel);
        });
      }

      // Send the request
      if (utils.isStream(data)) {
        data.on('error', function handleStreamError(err) {
          reject(enhanceError(err, config, null, req));
        }).pipe(req);
      } else {
        req.end(data);
      }
    });
  };

  var DEFAULT_CONTENT_TYPE = {
    'Content-Type': 'application/x-www-form-urlencoded'
  };

  function setContentTypeIfUnset(headers, value) {
    if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
      headers['Content-Type'] = value;
    }
  }

  function getDefaultAdapter() {
    var adapter;
    if (typeof XMLHttpRequest !== 'undefined') {
      // For browsers use XHR adapter
      adapter = xhr$1;
    } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
      // For node use HTTP adapter
      adapter = http_1;
    }
    return adapter;
  }

  var defaults = {
    adapter: getDefaultAdapter(),

    transformRequest: [function transformRequest(data, headers) {
      normalizeHeaderName(headers, 'Accept');
      normalizeHeaderName(headers, 'Content-Type');
      if (utils.isFormData(data) ||
        utils.isArrayBuffer(data) ||
        utils.isBuffer(data) ||
        utils.isStream(data) ||
        utils.isFile(data) ||
        utils.isBlob(data)
      ) {
        return data;
      }
      if (utils.isArrayBufferView(data)) {
        return data.buffer;
      }
      if (utils.isURLSearchParams(data)) {
        setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
        return data.toString();
      }
      if (utils.isObject(data)) {
        setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
        return JSON.stringify(data);
      }
      return data;
    }],

    transformResponse: [function transformResponse(data) {
      /*eslint no-param-reassign:0*/
      if (typeof data === 'string') {
        try {
          data = JSON.parse(data);
        } catch (e) { /* Ignore */ }
      }
      return data;
    }],

    /**
     * A timeout in milliseconds to abort a request. If set to 0 (default) a
     * timeout is not created.
     */
    timeout: 0,

    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',

    maxContentLength: -1,
    maxBodyLength: -1,

    validateStatus: function validateStatus(status) {
      return status >= 200 && status < 300;
    }
  };

  defaults.headers = {
    common: {
      'Accept': 'application/json, text/plain, */*'
    }
  };

  utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
    defaults.headers[method] = {};
  });

  utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
    defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
  });

  var defaults_1 = defaults;

  /**
   * Throws a `Cancel` if cancellation has been requested.
   */
  function throwIfCancellationRequested(config) {
    if (config.cancelToken) {
      config.cancelToken.throwIfRequested();
    }
  }

  /**
   * Dispatch a request to the server using the configured adapter.
   *
   * @param {object} config The config that is to be used for the request
   * @returns {Promise} The Promise to be fulfilled
   */
  var dispatchRequest = function dispatchRequest(config) {
    throwIfCancellationRequested(config);

    // Ensure headers exist
    config.headers = config.headers || {};

    // Transform request data
    config.data = transformData(
      config.data,
      config.headers,
      config.transformRequest
    );

    // Flatten headers
    config.headers = utils.merge(
      config.headers.common || {},
      config.headers[config.method] || {},
      config.headers
    );

    utils.forEach(
      ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
      function cleanHeaderConfig(method) {
        delete config.headers[method];
      }
    );

    var adapter = config.adapter || defaults_1.adapter;

    return adapter(config).then(function onAdapterResolution(response) {
      throwIfCancellationRequested(config);

      // Transform response data
      response.data = transformData(
        response.data,
        response.headers,
        config.transformResponse
      );

      return response;
    }, function onAdapterRejection(reason) {
      if (!isCancel(reason)) {
        throwIfCancellationRequested(config);

        // Transform response data
        if (reason && reason.response) {
          reason.response.data = transformData(
            reason.response.data,
            reason.response.headers,
            config.transformResponse
          );
        }
      }

      return Promise.reject(reason);
    });
  };

  /**
   * Config-specific merge-function which creates a new config-object
   * by merging two configuration objects together.
   *
   * @param {Object} config1
   * @param {Object} config2
   * @returns {Object} New object resulting from merging config2 to config1
   */
  var mergeConfig = function mergeConfig(config1, config2) {
    // eslint-disable-next-line no-param-reassign
    config2 = config2 || {};
    var config = {};

    var valueFromConfig2Keys = ['url', 'method', 'data'];
    var mergeDeepPropertiesKeys = ['headers', 'auth', 'proxy', 'params'];
    var defaultToConfig2Keys = [
      'baseURL', 'transformRequest', 'transformResponse', 'paramsSerializer',
      'timeout', 'timeoutMessage', 'withCredentials', 'adapter', 'responseType', 'xsrfCookieName',
      'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress', 'decompress',
      'maxContentLength', 'maxBodyLength', 'maxRedirects', 'transport', 'httpAgent',
      'httpsAgent', 'cancelToken', 'socketPath', 'responseEncoding'
    ];
    var directMergeKeys = ['validateStatus'];

    function getMergedValue(target, source) {
      if (utils.isPlainObject(target) && utils.isPlainObject(source)) {
        return utils.merge(target, source);
      } else if (utils.isPlainObject(source)) {
        return utils.merge({}, source);
      } else if (utils.isArray(source)) {
        return source.slice();
      }
      return source;
    }

    function mergeDeepProperties(prop) {
      if (!utils.isUndefined(config2[prop])) {
        config[prop] = getMergedValue(config1[prop], config2[prop]);
      } else if (!utils.isUndefined(config1[prop])) {
        config[prop] = getMergedValue(undefined, config1[prop]);
      }
    }

    utils.forEach(valueFromConfig2Keys, function valueFromConfig2(prop) {
      if (!utils.isUndefined(config2[prop])) {
        config[prop] = getMergedValue(undefined, config2[prop]);
      }
    });

    utils.forEach(mergeDeepPropertiesKeys, mergeDeepProperties);

    utils.forEach(defaultToConfig2Keys, function defaultToConfig2(prop) {
      if (!utils.isUndefined(config2[prop])) {
        config[prop] = getMergedValue(undefined, config2[prop]);
      } else if (!utils.isUndefined(config1[prop])) {
        config[prop] = getMergedValue(undefined, config1[prop]);
      }
    });

    utils.forEach(directMergeKeys, function merge(prop) {
      if (prop in config2) {
        config[prop] = getMergedValue(config1[prop], config2[prop]);
      } else if (prop in config1) {
        config[prop] = getMergedValue(undefined, config1[prop]);
      }
    });

    var axiosKeys = valueFromConfig2Keys
      .concat(mergeDeepPropertiesKeys)
      .concat(defaultToConfig2Keys)
      .concat(directMergeKeys);

    var otherKeys = Object
      .keys(config1)
      .concat(Object.keys(config2))
      .filter(function filterAxiosKeys(key) {
        return axiosKeys.indexOf(key) === -1;
      });

    utils.forEach(otherKeys, mergeDeepProperties);

    return config;
  };

  /**
   * Create a new instance of Axios
   *
   * @param {Object} instanceConfig The default config for the instance
   */
  function Axios(instanceConfig) {
    this.defaults = instanceConfig;
    this.interceptors = {
      request: new InterceptorManager_1(),
      response: new InterceptorManager_1()
    };
  }

  /**
   * Dispatch a request
   *
   * @param {Object} config The config specific for this request (merged with this.defaults)
   */
  Axios.prototype.request = function request(config) {
    /*eslint no-param-reassign:0*/
    // Allow for axios('example/url'[, config]) a la fetch API
    if (typeof config === 'string') {
      config = arguments[1] || {};
      config.url = arguments[0];
    } else {
      config = config || {};
    }

    config = mergeConfig(this.defaults, config);

    // Set config.method
    if (config.method) {
      config.method = config.method.toLowerCase();
    } else if (this.defaults.method) {
      config.method = this.defaults.method.toLowerCase();
    } else {
      config.method = 'get';
    }

    // Hook up interceptors middleware
    var chain = [dispatchRequest, undefined];
    var promise = Promise.resolve(config);

    this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
      chain.unshift(interceptor.fulfilled, interceptor.rejected);
    });

    this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
      chain.push(interceptor.fulfilled, interceptor.rejected);
    });

    while (chain.length) {
      promise = promise.then(chain.shift(), chain.shift());
    }

    return promise;
  };

  Axios.prototype.getUri = function getUri(config) {
    config = mergeConfig(this.defaults, config);
    return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
  };

  // Provide aliases for supported request methods
  utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
    /*eslint func-names:0*/
    Axios.prototype[method] = function(url, config) {
      return this.request(mergeConfig(config || {}, {
        method: method,
        url: url,
        data: (config || {}).data
      }));
    };
  });

  utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
    /*eslint func-names:0*/
    Axios.prototype[method] = function(url, data, config) {
      return this.request(mergeConfig(config || {}, {
        method: method,
        url: url,
        data: data
      }));
    };
  });

  var Axios_1 = Axios;

  /**
   * A `Cancel` is an object that is thrown when an operation is canceled.
   *
   * @class
   * @param {string=} message The message.
   */
  function Cancel(message) {
    this.message = message;
  }

  Cancel.prototype.toString = function toString() {
    return 'Cancel' + (this.message ? ': ' + this.message : '');
  };

  Cancel.prototype.__CANCEL__ = true;

  var Cancel_1 = Cancel;

  /**
   * A `CancelToken` is an object that can be used to request cancellation of an operation.
   *
   * @class
   * @param {Function} executor The executor function.
   */
  function CancelToken(executor) {
    if (typeof executor !== 'function') {
      throw new TypeError('executor must be a function.');
    }

    var resolvePromise;
    this.promise = new Promise(function promiseExecutor(resolve) {
      resolvePromise = resolve;
    });

    var token = this;
    executor(function cancel(message) {
      if (token.reason) {
        // Cancellation has already been requested
        return;
      }

      token.reason = new Cancel_1(message);
      resolvePromise(token.reason);
    });
  }

  /**
   * Throws a `Cancel` if cancellation has been requested.
   */
  CancelToken.prototype.throwIfRequested = function throwIfRequested() {
    if (this.reason) {
      throw this.reason;
    }
  };

  /**
   * Returns an object that contains a new `CancelToken` and a function that, when called,
   * cancels the `CancelToken`.
   */
  CancelToken.source = function source() {
    var cancel;
    var token = new CancelToken(function executor(c) {
      cancel = c;
    });
    return {
      token: token,
      cancel: cancel
    };
  };

  var CancelToken_1 = CancelToken;

  /**
   * Syntactic sugar for invoking a function and expanding an array for arguments.
   *
   * Common use case would be to use `Function.prototype.apply`.
   *
   *  ```js
   *  function f(x, y, z) {}
   *  var args = [1, 2, 3];
   *  f.apply(null, args);
   *  ```
   *
   * With `spread` this example can be re-written.
   *
   *  ```js
   *  spread(function(x, y, z) {})([1, 2, 3]);
   *  ```
   *
   * @param {Function} callback
   * @returns {Function}
   */
  var spread = function spread(callback) {
    return function wrap(arr) {
      return callback.apply(null, arr);
    };
  };

  /**
   * Determines whether the payload is an error thrown by Axios
   *
   * @param {*} payload The value to test
   * @returns {boolean} True if the payload is an error thrown by Axios, otherwise false
   */
  var isAxiosError = function isAxiosError(payload) {
    return (typeof payload === 'object') && (payload.isAxiosError === true);
  };

  /**
   * Create an instance of Axios
   *
   * @param {Object} defaultConfig The default config for the instance
   * @return {Axios} A new instance of Axios
   */
  function createInstance(defaultConfig) {
    var context = new Axios_1(defaultConfig);
    var instance = bind(Axios_1.prototype.request, context);

    // Copy axios.prototype to instance
    utils.extend(instance, Axios_1.prototype, context);

    // Copy context to instance
    utils.extend(instance, context);

    return instance;
  }

  // Create the default instance to be exported
  var axios$1 = createInstance(defaults_1);

  // Expose Axios class to allow class inheritance
  axios$1.Axios = Axios_1;

  // Factory for creating new instances
  axios$1.create = function create(instanceConfig) {
    return createInstance(mergeConfig(axios$1.defaults, instanceConfig));
  };

  // Expose Cancel & CancelToken
  axios$1.Cancel = Cancel_1;
  axios$1.CancelToken = CancelToken_1;
  axios$1.isCancel = isCancel;

  // Expose all/spread
  axios$1.all = function all(promises) {
    return Promise.all(promises);
  };
  axios$1.spread = spread;

  // Expose isAxiosError
  axios$1.isAxiosError = isAxiosError;

  var axios_1 = axios$1;

  // Allow use of default import syntax in TypeScript
  var _default = axios$1;
  axios_1.default = _default;

  var axios = axios_1;

  var Api = /*#__PURE__*/function () {
    function Api() {
      _classCallCheck(this, Api);

      this.client = axios.create({
        baseURL: 'https://jsonplaceholder.typicode.com/',
        timeout: 60000,
        headers: {
          'X-Custom-Header': 'foobar'
        }
      });
    }

    _createClass(Api, [{
      key: "get",
      value: function get(url) {
        var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
        return this.client.get(url, config);
      }
    }, {
      key: "post",
      value: function post(url, params) {
        var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
        return this.client.post(url, params, config);
      }
    }, {
      key: "delete",
      value: function _delete(url) {
        var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
        return this.client["delete"](url, config);
      }
    }, {
      key: "patch",
      value: function patch(url, params) {
        return this.client.put(url, params);
      }
    }, {
      key: "put",
      value: function put(url, params) {
        return this.client.put(url, params);
      }
    }]);

    return Api;
  }();

  function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

  var Muon = /*#__PURE__*/function () {
    function Muon(url, nSign) {
      _classCallCheck(this, Muon);

      this.BASE_URL = url;
      this.nSign = nSign ? nSign : 2;
    }

    _createClass(Muon, [{
      key: "app",
      value: function app(_app) {
        var appCall = new AppCall(this, _app);
        return appCall;
      }
    }, {
      key: "request",
      value: function () {
        var _request = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee(dataInfo) {
          var apiInstance, muonResponse, result, responseData, _result$cid, _result$signatures$, _result$signatures$2, _result$data, _result$data$init, reqId, groupAddress, signature, nonceAddress, sigs;

          return regenerator.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.prev = 0;
                  apiInstance = new Api();
                  _context.next = 4;
                  return apiInstance.post(this.BASE_URL, dataInfo);

                case 4:
                  muonResponse = _context.sent;

                  if (!muonResponse.data.success) {
                    _context.next = 11;
                    break;
                  }

                  result = muonResponse.data.result;

                  if (result.confirmed) {
                    reqId = "0x".concat((_result$cid = result.cid) === null || _result$cid === void 0 ? void 0 : _result$cid.substr(1));
                    groupAddress = (_result$signatures$ = result.signatures[0]) === null || _result$signatures$ === void 0 ? void 0 : _result$signatures$.owner;
                    signature = (_result$signatures$2 = result.signatures[0]) === null || _result$signatures$2 === void 0 ? void 0 : _result$signatures$2.signature;
                    nonceAddress = (_result$data = result.data) === null || _result$data === void 0 ? void 0 : (_result$data$init = _result$data.init) === null || _result$data$init === void 0 ? void 0 : _result$data$init.nonceAddress;
                    sigs = [{
                      signature: signature,
                      owner: groupAddress,
                      nonce: nonceAddress
                    }];
                    responseData = _objectSpread(_objectSpread({}, result), {}, {
                      reqId: reqId,
                      sigs: sigs
                    });
                  } else {
                    responseData = _objectSpread({}, result);
                  }

                  return _context.abrupt("return", responseData);

                case 11:
                  return _context.abrupt("return", muonResponse.data);

                case 12:
                  _context.next = 18;
                  break;

                case 14:
                  _context.prev = 14;
                  _context.t0 = _context["catch"](0);
                  console.log('error happend in request muon', _context.t0);
                  return _context.abrupt("return", _context.t0.message);

                case 18:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this, [[0, 14]]);
        }));

        function request(_x) {
          return _request.apply(this, arguments);
        }

        return request;
      }()
    }]);

    return Muon;
  }();

  return Muon;

})));
