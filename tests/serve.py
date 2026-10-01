"""Static server for the smoke tests: the site root, threaded, with a listen
backlog big enough for parallel Playwright workers (http.server's default of
5 refuses connections under load, which shows up as false request failures)."""
import functools
import http.server
import sys
from pathlib import Path


class Server(http.server.ThreadingHTTPServer):
    request_queue_size = 256
    daemon_threads = True


class QuietHandler(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *args):
        pass


port = int(sys.argv[1])
root = Path(__file__).resolve().parent.parent
handler = functools.partial(QuietHandler, directory=str(root))
Server(("127.0.0.1", port), handler).serve_forever()
