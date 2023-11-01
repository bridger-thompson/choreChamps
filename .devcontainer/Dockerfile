
FROM almalinux:8

RUN dnf -y install \
      openssh-clients \
      tar \
      gzip \
      git \
      nodejs \
      python38 python38-pip \
      gcc \
      python38-devel \
      openldap-devel && \
    rm -rf /var/cache/yum && \
    npm i -g n && \
    n 16

RUN groupadd --gid 1000 developer \
    && useradd --uid 1000 --gid 1000 -m developer \
    && chown -R developer. /home/developer

USER developer

RUN python3 -m venv /home/developer/.virtualenvs/choreChamps \
  && source /home/developer/.virtualenvs/choreChamps/bin/activate \
  && pip install --upgrade pip

WORKDIR /app
