import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { newReviews } from "./menu";

@Injectable()
export class ReviewsService {
  private APIReviews = "https://4w3x1gpo88.execute-api.us-west-2.amazonaws.com/Prod/Reviews/getReviews";
  private APIAddReviews = "https://4w3x1gpo88.execute-api.us-west-2.amazonaws.com/Prod/Reviews/postAddReviews";

  constructor(private http: HttpClient) {}

  getReviews(id) {
    return this.http.get(this.APIReviews + id);
  }

  addReviews(id, range, comments) {
    let data: newReviews = <newReviews>{
      valoracion: +range,
      mensaje: comments,
      idProducto: +id,
    };

    return this.http.post<newReviews[]>(this.APIAddReviews, data).subscribe(
      (res) => {},
      (error) => {
      }
    );
  }
}
