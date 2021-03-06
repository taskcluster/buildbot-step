#! /usr/bin/env python

import datetime
import distutils.spawn
import math
import os
import subprocess
import sys
import time

HELP = """
Invalid number of arguments ...

Usage:
    buildbot_step <title> <command...>

Examples:
    buildbot_step 'List my directory the long way' ls -lah
""".strip()

BB_LINE = "========= {} ========="

TIME_FORMAT = '%Y-%m-%d %H:%M:%S.%f'

def status_line(type, step, code, duration):
    line = "{} {} (results: {}, elapsed: {} secs) (at {})"
    print(BB_LINE.format(line.format(
        type,
        step,
        code,
        int(math.ceil(duration)),
        datetime.datetime.now().strftime(TIME_FORMAT)
    )))



def main(args):
    """
    Run the given command with buildbot specific output the first argument is
    always the name of the command...
    """

    if len(args) < 2 or args[0] == '-h':
        print(HELP)

    title = args[0]
    command = args[1:]

    # Hack around the fact that call does not know how to handle relative
    # executables...
    executable = os.path.abspath(distutils.spawn.find_executable(command[0]))
    command[0] = executable

    start = time.time()
    status_line(title, 'Started', 0, 0)
    exit_code = subprocess.call(command)
    status_line(title, 'Finished', exit_code, time.time() - start)
    sys.exit(exit_code)


main(sys.argv[1:])
