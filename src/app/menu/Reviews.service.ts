import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { newReviews } from "./Producto";

@Injectable()
export class ReviewsService {
  private APIReviews = "http://localhost:5000/Reviews/getReviews";
  private APIAddReviews = "http://localhost:5000/Reviews/postAddReviews";

  constructor(private http: HttpClient) {}

  getReviews(id) {
    return this.http.get(this.APIReviews + id);
  }

  addReviews(id, range, comments) {
    let data: newReviews = <newReviews>{
      valoracion: +range,
      mensaje: comments,
      idproducto: +id,
    };

    return this.http.post<newReviews[]>(this.APIAddReviews, data).subscribe(
      (res) => {},
      (error) => {
        console.log(error);
      },
      () => {
      }
    );
  }
}
