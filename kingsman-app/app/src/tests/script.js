import http from "k6/http";
export const options = {
  vus: 1000,
  duration: "30s",
};

export default function main() {
  http.get("https://kingsmanco.vercel.app/");
}
