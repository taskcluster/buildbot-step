# buildbot-step

Bash script wrapper which will output the "builbot step" format that treeherder
is familar with.

Note that the intention is you can pull this script down into your
docker image via a raw github url or manually copy/paste into some other
utility.

If your test framework/harness has the ability to generate the
appropriate treehreder api calls you should do this instead!

## Usage

```sh
buildbot_step 'Fireworks' ls -lah
```

```
========= Started Fireworks (results: 0, elapsed: 0 secs) (at 2015-02-06 22:32:32.N) =========
total 16
drwxr-xr-x    5 mozilla  staff   170B Feb  6 22:32 .
drwxr-xr-x  213 mozilla  staff   7.1K Feb  6 22:29 ..
drwxr-xr-x   12 mozilla  staff   408B Feb  6 22:32 .git
-rw-r--r--    1 mozilla  staff   112B Feb  6 22:29 README.md
-rwxr--r--    1 mozilla  staff   1.2K Feb  6 22:32 buildbot_step
========= Finished Fireworks (results: 0, elapsed: 0 secs) (at 2015-02-06 22:32:32.N) =========
```

## LICENSE

Copyright 2015, Mozilla Foundation

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
