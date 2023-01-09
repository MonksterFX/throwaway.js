# throwAway.js

Share Client Side Encrypted Notes - [DEMO](https://notes.mrmonk.dev/?from=github)

## Motivation

Secrets are shared widly by mail or in messengers. This is very bad, because often that channels are not encrypted (email) or it is impossible to delete content from them.

More on this project is documented at my blog: [mrmonk.dev - throwAway.js](https://mrmonk.dev/blog/projects/microtools/throw-away-js/)

## Content Of This Repro

This repository contains 3 projects:

- server -> Lightweight Express Backend
- lib -> Browser Library
- frontend -> Simple Vue UI

## Requirements

**Features**

- client side encryption only
- storage keys are derived from password and token
- message and payload
- self destruction after 24h
- email notification on read/self-destruction (not implemented yet)

**Two Modes**

- passwordless - share by link
- two factor - share by link and password

**Easy To Deploy**

- dockerized
- ui included

## Build Docker Image

You can easily build the standalone server (express + ui + lib) with the following command. If you want to build for production config (UI) just profide build arg VITE_MODE.

`"docker build -t <tag> ."` or `"docker build -t <tag> --build-arg VITE_MODE=<mode> ."`

## Licence & Warranty

MIT

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## Bugs And Security Issues

https://github.com/MonksterFX/throwaway.js
