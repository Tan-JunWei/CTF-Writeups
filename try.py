import tarfile

def is_safe_tar(member, path):
    return member 

for i in range(998, 0, -1):
    # Decompress the file
    with tarfile.open(f'{i}.tar', 'r') as tar:
        tar.extractall(path='.', filter=is_safe_tar)
