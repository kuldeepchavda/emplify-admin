import { useNavigate } from "react-router-dom";

export default function useApi() {
  const navigate = useNavigate();

  async function request(url, options = {}) {
    console.log("Hit at url",url)
    const res = await fetch(url, {
      credentials: "include", // keep cookies
      ...options,
    });

    if (res.status === 403) {
      const data = await res.json();
      console.log({ message: data.message });
      navigate("/login");
      return null; // stop further processing
    }

    return res.json();
  }

  return { request };
}
