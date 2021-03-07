import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PushNotiService {

  readonly VAPID_PUBLIC_KEY = "BPTGrBy6K53p-kDw9qEUW6GjVp3aIYy54A7lZIIF9FMnL1YzppY18pY35jomENPgDM-qYZSKksqlIQPLyXeest8";

  constructor() { }
}
