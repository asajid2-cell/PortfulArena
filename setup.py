import shutil
import subprocess
import sys
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent


def run(command: list[str], cwd: Path) -> None:
    process = subprocess.run(
        command,
        cwd=cwd,
        text=True,
        check=False,
    )
    if process.returncode != 0:
        raise RuntimeError(f"Command {' '.join(command)} failed with exit code {process.returncode}")


def main() -> None:
    print("=== Portful Arena setup ===")

    node_path = shutil.which("node")
    npm_path = shutil.which("npm")

    if node_path is None or npm_path is None:
        print("\n[!] Node.js and npm are required but were not detected on this system.")
        print("    Install Node.js (v18 or newer) from https://nodejs.org/ and ensure 'node' and 'npm'")
        print("    are available on your PATH, then rerun `python setup.py`.\n")
        sys.exit(1)

    print(f"Detected node at: {node_path}")
    print(f"Detected npm at:  {npm_path}")

    try:
        npm_executable = npm_path

        print("\n1. Installing project dependencies...")
        run([npm_executable, "install"], cwd=REPO_ROOT)

        print("2. Building the Astro project...")
        run([npm_executable, "run", "build"], cwd=REPO_ROOT)

        print("3. Running Astro type/content checks...")
        run([npm_executable, "run", "lint"], cwd=REPO_ROOT)

    except RuntimeError as error:
        print(f"\n[!] Setup halted: {error}")
        print("    Resolve the issue above and rerun `python setup.py`.")
        sys.exit(1)

    print("\nSetup complete. You can now run `npm run dev` to start the local server.")


if __name__ == "__main__":
    main()
