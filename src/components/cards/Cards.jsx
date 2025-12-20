import { getSpeakers } from "../../lib/apiSpeakers";

export default function Card({ data }) {
  data = getSpeakers();
  console.log(data);
}
