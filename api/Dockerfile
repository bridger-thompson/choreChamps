FROM almalinux:8

RUN dnf -y install \
      python38 \
      python38-pip \
      gcc \
      python38-devel \
      openldap-devel && \
    rm -rf /var/cache/yum && \
    pip3 install --upgrade pip

WORKDIR /app

COPY ./requirements.txt requirements.txt

RUN pip3 install --no-cache-dir --upgrade -r requirements.txt

COPY ./src src

CMD ["uvicorn", "src.main:app", "--proxy-headers", "--host", "0.0.0.0", "--port", "8080"]


