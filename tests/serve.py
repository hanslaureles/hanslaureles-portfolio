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

    def send_head(self):
        # Route like vercel.json (cleanUrls, trailingSlash: false): /aura-store serves
        # aura-store/index.html and /case-ciel serves case-ciel.html with no redirect,
        # so relative URLs resolve against the same base they get in production.
        path = self.path.split("?", 1)[0].split("#", 1)[0]
        local = Path(self.translate_path(path))
        if not path.endswith("/") and not local.suffix:
            if (local / "index.html").is_file():
                self.path = path + "/index.html"
            elif local.with_suffix(".html").is_file():
                self.path = path + ".html"
        return super().send_head()


port = int(sys.argv[1])
root = Path(__file__).resolve().parent.parent
handler = functools.partial(QuietHandler, directory=str(root))
Server(("127.0.0.1", port), handler).serve_forever()
