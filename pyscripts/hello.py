#!/usr/bin/env python3

"""Simple Python example script."""

import platform
import datetime


def main():
    print("Hello from Python and commit to main!")
    print(f"Platform: {platform.system()} {platform.release()}")
    print(f"Python version: {platform.python_version()}")
    print(f"Current time: {datetime.datetime.now().isoformat(sep=' ', timespec='seconds')}")


if __name__ == '__main__':
    main()
