# Haraka Outbounce Server Deployment Guide

---

## 1. Install Node JS and Haraka

Make sure `NPM` is installed and with `Node` version >= 18.x.x, then install Haraka via NPM

```shell
npm install Haraka -g
```

> If installation failed due to `make` failure. Make sure to install `build-essential`
>
> ```shell
> sudo apt install build-essential
> ```

## 2. Setup AUTH User and Password

Copy `[path_to_haraka]/config/auth_flat_file.example.ini` to `[path_to_haraka]/config/auth_flat_file.ini`. Under `[users]` section configure auth user.

For example:

```ini
[users]
app@yourdomain.com=PASSWORD_GOES_HERE
```

**Note:** Make sure username contain local part matching `MAIL FROM` domain, otherwise Haraka will reject the email

## 3 Setup TLS certificate

You can install trusted CA certificates and save private key to `/config/tls_key.pem` along with certificate file to `/config/tls_cert.pem`

Or you could use self-issued TLS certificate since we only use tls connection within local host.

Haraka recommend this [command](https://haraka.github.io/plugins/tls#self-issued-unsigned-certificate) to generate self-issued certificate

```shell
openssl req -x509 -nodes -days 2190 -newkey rsa:2048 -keyout config/tls_key.pem -out config/tls_cert.pem
```

## 4. Setup DKIM signing

```shell
sh [path_to_haraka]/config/dkim/dkim_key_gen.sh [your_domain]
```

This will create a directory `[your_domain]` which will contain dkim private and public key.

Next, follow instruction in `/path/to/haraka/config/dkim/mailixer.cc/dns` file to setup
DKIM and SPF DNS record

## 5. Setup Systemd Service

Modify `ExecStart` section in `[path_to_mailixer_project]/smtp/haraka.service` so that it point to your Haraka installed binary and its config directory
